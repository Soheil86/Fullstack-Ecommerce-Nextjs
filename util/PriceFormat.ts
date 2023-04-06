const formatPrice = (price: number) => {
  return Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price / 100)
}
export default formatPrice
