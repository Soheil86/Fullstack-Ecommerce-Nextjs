'use client'

import Image from 'next/image'
import { useCartStore } from '@/store'
import formatPrice from '@/util/PriceFormat'
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'
import basket from '@/public/shopping-basket-2.png'
import { AnimatePresence, motion } from 'framer-motion'
import Checkout from './Checkout'

export default function Cart() {
  const cartStore = useCartStore()

  // Total price of all items in cart
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className='fixed w-full h-screen left-0 top-0 bg-black/25'
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className='bg-white absolute right-0 top-0 h-screen p-12 overflow-y-auto text-gray-700 w-full lg:w-2/5'
      >
        {cartStore.onCheckout === 'cart' && (
          <button
            onClick={() => cartStore.toggleCart()}
            className='text-sm font-bold pb-12'
          >
            Back to store 🏃🏻‍♂️
          </button>
        )}
        {cartStore.onCheckout === 'checkout' && (
          <button
            onClick={() => cartStore.setCheckout('cart')}
            className='text-sm font-bold pb-12'
          >
            Check your cart 🛒
          </button>
        )}
        {/** Cart Items */}
        {cartStore.onCheckout === 'cart' && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div layout key={item.id} className='flex gap-4 py-4'>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className='rounded-md h-24'
                />
                <motion.div layout>
                  <h2>{item.name}</h2>
                  <div className='flex gap-2'>
                    <h2>Quantity: {item.quantity}</h2>
                    <button
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoRemoveCircle />
                    </button>
                    <button
                      onClick={() =>
                        cartStore.addProduct({
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoAddCircle />
                    </button>
                  </div>
                  <p className='text-sm'>{formatPrice(item.price)}</p>
                </motion.div>
              </motion.div>
            ))}
          </>
        )}
        {/** Total price */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === 'cart' ? (
          <motion.div layout>
            <p>Total Price:{formatPrice(totalPrice)}</p>
            <button
              onClick={() => cartStore.setCheckout('checkout')}
              className='py-2 mt-4 bg-teal-700 w-full rounded-md text-white'
            >
              CheckOut
            </button>
          </motion.div>
        ) : null}
        {/* Checkout Form */}
        {cartStore.onCheckout === 'checkout' && <Checkout />}
        <AnimatePresence>
          {!cartStore.cart.length && (
            <motion.div
              layout
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className='flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75'
            >
              <h1>There is nothing in your cart 😢</h1>
              <Image src={basket} alt='empty cart' width={200} height={200} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
