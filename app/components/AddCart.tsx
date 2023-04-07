'use client'

import { useCartStore } from '@/store'
import { AddCartType } from '@/types/AddCartType'

export default function AddCart({
  name,
  id,
  image,
  quantity,
  price,
}: AddCartType) {
  const cartStore = useCartStore()
  return (
    <button
      onClick={() => cartStore.addProduct({ name, id, image, quantity, price })}
      className='bg-teal-600 text-white py-2 px-6 rounded-md my-12'
    >
      Add to Cart
    </button>
  )
}
