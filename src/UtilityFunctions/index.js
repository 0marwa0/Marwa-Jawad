export const getPrice = (prices, currentCurrency) => {
  let price = prices?.filter(
    (price) => price.currency.symbol === currentCurrency
  )
  price = price?.[0].amount
  return Number(price)
}

export const totalPrice = (items, currency) => {
  let total = 0
  items?.map((item) => {
    const amount = getPrice(item.prices, currency)
    total = amount * item.count
    return item
  })

  return total
}
