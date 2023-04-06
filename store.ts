import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  description?: string
  images?: string[]
}

type CartStore = {
  isOpen: boolean
  cart: CartItem[]
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
    }),
    {
      name: 'cart-store',
    }
  )
)
