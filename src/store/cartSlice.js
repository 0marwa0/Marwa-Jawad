import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchRequest } from './Api'
export const getCart = createAsyncThunk('cart/getCart', fetchRequest)

const cartSlice = createSlice({
  name: 'cart',
  showCart: false,
  initialState: {
    cart: { items: [] },
  },
  reducers: {
    addProduct(state, action) {
      if (state.cart?.items === undefined) {
        state.items?.push(action.payload)
      } else {
        state.cart?.items.push(action.payload)
      }
    },
    updateCart(state, action) {
      console.log('update cart', action.payload)
      state.cart.items = action.payload
    },
    removeProduct(state, action) {
      const index = state.cart.items.findIndex(
        (cart) => cart.cartId === action.payload
      )
      state.cart.items.splice(index, 1)
    },
    increase(state, action) {
      state.cart.items.map((item) => {
        if (action.payload === item.cartId) {
          item.count = item.count + 1
          return item
        } else {
          return item
        }
      })
    },
    decrease(state, action) {
      state.cart.items.map((item) => {
        if (action.payload === item.cartId && item.count > 1) {
          item.count = item.count - 1
          return item
        } else {
          return item
        }
      })
    },
  },
})
export const { updateCart, addProduct, removeProduct, decrease, increase } =
  cartSlice.actions
export default cartSlice.reducer
