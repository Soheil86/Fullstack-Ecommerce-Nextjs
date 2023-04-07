type Params = {
  id: string
}

type SearchParams = {
  name: string
  price: number | null
  image: string
  id: string
  description: string
}

export type SearchParamTypes = {
  params: Params
  searchParams: SearchParams
}
