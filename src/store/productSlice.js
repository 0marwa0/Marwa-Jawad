import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { productQuery } from './queries'

export const fetchProduct = createAsyncThunk(
  'productStore/fetchProduct',
  async (id) => {
    return await axios
      .post('http://localhost:4000/', {
        query: productQuery(id),
      })
      .then((res) => res.data.data.product)
  }
)
const productSlice = createSlice({
  name: 'products',
  initialState: {
    product: {},
  },

  extraReducers: {
    [fetchProduct.fulfilled](state, action) {
      const attributes = action.payload.attributes.map((product) => ({
        ...product,
        selected: product.items[0].value,
      }))
      const product = { ...action.payload, attributes }

      state.product = product
    },
  },
})
export const { getProductById } = productSlice.actions
export default productSlice.reducer
