'use client'

import Image from 'next/image'
import { useCartStore } from '@/store'

export default function Cart() {
  const cartStore = useCartStore()
  return (
    <div className='flex flex-col gap-4 p-12'>
      <h1 className='text-2xl font-medium'>Cart</h1>
      <div className='flex flex-col gap-4'>
        {cartStore.cart.map((item) => (
          <div className='flex justify-between gap-4'>
            <Image
              src={item.image}
              alt={item.name}
              width={350}
              height={350}
              className='rounded-lg object-cover'
            />
            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-medium'>{item.name}</h1>
              <p className='text-sm text-gray-500'>{item.description}</p>
              <p className='text-sm text-teal-700 font-bold'>
                Price: {item.price && formatPrice(item.price)} // formatPrice is
                a function that formats the price to a currency
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
