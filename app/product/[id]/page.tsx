import AddCart from '@/app/components/AddCart'
import formatPrice from '@/util/PriceFormat'
import { SearchParamTypes } from '@/types/SearchParamTypes'
import Image from 'next/image'

export default function ProductPage({ searchParams }: SearchParamTypes) {
  return (
    <div className='flex flex-col 2xl:flex-row items-center justify-between gap-16'>
      <Image
        className='rounded-lg w-full'
        src={searchParams.image}
        alt={searchParams.name}
        width={350}
        height={350}
        priority={true}
      ></Image>
      <div>
        <h1 className='text-2xl font-medium py-2'>{searchParams.name}</h1>
        <p className='py-2'>{searchParams.description}</p>

        <div className='flex gap-2'>
          <p className='text-sm font-bold text-primary'>
            Price:
            {searchParams.price && formatPrice(searchParams.price)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  )
}
