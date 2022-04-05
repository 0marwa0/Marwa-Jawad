import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { productsQuery } from './queries'

export const fetchProducts = createAsyncThunk(
  'productStore/fetchProducts',
  async (category) => {
    return await axios
      .post('http://localhost:4000/', { query: productsQuery(category) })
      .then((res) => res.data.data)
  }
)
const ProductsSlice = createSlice({
  name: 'Products',
  initialState: {
    products: [],
  },

  extraReducers: {
    [fetchProducts.fulfilled](state, action) {
      const products = action.payload.category.products.map((item) => {
        const updated = item.attributes.map((product) => ({
          ...product,

          selected: product.items[0].value,
        }))
        return { ...item, attributes: updated }
      })

      state.products = products
    },
  },
})

export default ProductsSlice.reducer
