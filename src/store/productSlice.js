import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const query = `
{
  category{
    name
  
    products{
      id
      name  
      brand
      gallery
      description
      inStock
      attributes{
        type
        name
        items{
          value
        }
      }
      prices{
        currency{
          symbol
          label
        }
        amount
      }
    }
  }
}

`
export const fetchProduct = createAsyncThunk(
  'productStore/fetchProdcut',
  async (id) => {
    return await axios
      .post('http://localhost:4000/', { query: query })
      .then(
        (res) =>
          res.data.data.category.products.filter((item) => item.id === id)[0]
      )
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
