import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
      })
      // Create a customer in Stripe if the user has an email address
      if (user.name && user.email) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        })
        // Also update the user in the database with the Stripe customer ID
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            stripeCustomerId: customer.id,
          },
        })
      }
    },
  },
}

export default NextAuth(authOptions)
