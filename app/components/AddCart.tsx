'use client'

import { useCartStore } from '@/store'
import { AddCartType } from '@/types/AddCartType'
import { useState } from 'react'

export default function AddCart({
  name,
  id,
  image,
  quantity,
  price,
}: AddCartType) {
  const cartStore = useCartStore()

  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    cartStore.addProduct({ name, id, image, quantity, price })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={added}
      className='my-4 btn btn-primary w-full'
    >
      {!added ? 'Add to cart' : 'Added to cart 😊'}
    </button>
  )
}
