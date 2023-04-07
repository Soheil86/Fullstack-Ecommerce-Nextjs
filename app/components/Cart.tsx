'use client'

import Image from 'next/image'
import { useCartStore } from '@/store'
import formatPrice from '@/util/PriceFormat'

export default function Cart() {
  const cartStore = useCartStore()
  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className='fixed w-full h-screen left-0 top-0 bg-black/25'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-auto text-gray-700'
      >
        <h1>Here is yoiur shopping list </h1>
        {cartStore.cart.map((item) => (
          <div className='flex justify-between items-center gap-12 my-4'>
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className='rounded-md'
            />
            <div className='flex flex-col gap-2'>
              <h2>{item.name}</h2>
              <h2>Quantity: {item.quantity}</h2>
              <p className='text-sm'>{formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
        <button className='py-2 mt-4 bg-teal-700 w-full rounded-md text-white'>
          CheckOut
        </button>
      </div>
    </div>
  )
}
