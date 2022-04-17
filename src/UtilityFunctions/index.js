import { updateCart } from '../store/cartSlice'
import store from '../store/index'
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
    total = total + amount * item.count
    return item
  })

  return total
}
export const hasNewAttributes = (cart, product) => {
  let isNew = true
  // get all similar products in the cart
  const cartItems = cart.filter((item) => item.id === product.id)

  for (let index = 0; index < cartItems.length; index++) {
    const attributes = cartItems[index].attributes
    const storeItem = attributes.map((item) => item.selected)
    const currentItem = product.attributes.map((item) => item.selected)
    // check if we see this attributes before
    if (JSON.stringify(storeItem) === JSON.stringify(currentItem)) {
      isNew = false
      // if it hasn't a new attribute value then increase the count
      const id = cartItems[index].cartId
      const updatedCart = cart.map((item) => {
        const temp = Object.assign({}, item)
        if (temp.cartId === id) {
          temp.count = temp.count + 1
        }
        return temp
      })
      store.dispatch(updateCart(updatedCart))
    }
  }

  return isNew
}
