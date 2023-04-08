import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AddCartType } from './types/AddCartType'

type CartState = {
  isOpen: boolean
  cart: AddCartType[]
  toggleCart: () => void
  addProduct: (item: AddCartType) => void
  removeProduct: (item: AddCartType) => void
  paymentIntent: string
  onCheckout: 'checkout'
  setPaymentIntent: (val: string) => void
  setCheckout: (val: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      paymentIntent: '',
      onCheckout: 'checkout',
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          )
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                }
              }
              return cartItem
            })
            return {
              cart: updatedCart,
            }
          } else {
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            }
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          )
          if (existingItem && existingItem.quantity > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return {
                  ...cartItem,
                  quantity: cartItem.quantity - 1,
                }
              }
              return cartItem
            })
            return {
              cart: updatedCart,
            }
          } else {
            const filterdCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id
            )
            return {
              cart: filterdCart,
            }
          }
        }),
      setPaymentIntent: (val) => set((state) => ({ paymentIntent: val })),
      setCheckout: (val) => set((state) => ({ onCheckout: val })),
    }),
    {
      name: 'cart-store',
    }
  )
)
