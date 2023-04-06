import formatPrice from '@/util/PriceFormat'
import { SearchParamTypes } from '@/util/SearchParamTypes'
import Image from 'next/image'

export default function ProductPage({ searchParams }: SearchParamTypes) {
  return (
    <div className='flex justify-between gap-24 p-12 text-gray-700'>
      <Image
        className='rounded-lg object-cover'
        src={searchParams.image}
        alt={searchParams.name}
        width={350}
        height={350}
      ></Image>
      <div>
        <h1 className='text-2xl font-medium py-2'>{searchParams.name}</h1>
        <p className='py-2'>{searchParams.description}</p>

        <div className='flex gap-2'>
          <p className='text-sm text-teal-700 font-bold'>
            Price:
            {searchParams.price && formatPrice(searchParams.price)}
          </p>
        </div>
        <button className='my-12 text-white p-4 font-medium rounded-md bg-teal-700'>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
