'use client'

import Image from 'next/image'
import { useCartStore } from '@/store'
import formatPrice from '@/util/PriceFormat'
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'
import basket from '@/public/shopping-basket-2.png'

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
          <div className='flex gap-4 py-4'>
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
              className='rounded-md h-24'
            />
            <div>
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
            </div>
          </div>
        ))}
        {cartStore.cart.length > 0 && (
          <button className='py-2 mt-4 bg-teal-700 w-full rounded-md text-white'>
            CheckOut
          </button>
        )}
        {!cartStore.cart.length && (
          <div className='flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75'>
            <h1>There is nothing in your cart 😢</h1>
            <Image src={basket} alt='empty cart' width={200} height={200} />
          </div>
        )}
      </div>
    </div>
  )
}
