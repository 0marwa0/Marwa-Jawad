import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setPreferences, getPreferences } from './Api'
import { categoriesQuery } from './queries'

export const fetchCategory = createAsyncThunk(
  'productStore/fetchCategory',
  async () => {
    return await axios
      .post('http://localhost:4000/', { query: categoriesQuery })
      .then((res) => res.data.data)
  }
)
const CategoriesSlice = createSlice({
  name: 'Category',
  initialState: {
    categories: [],
    currentCategory:
      getPreferences('category') !== null
        ? getPreferences('category').currentCategory
        : '',
  },

  reducers: {
    setCategory(state, action) {
      state.currentCategory = action.payload
      setPreferences('category', {
        currentCategory: action.payload,
      })
    },
  },
  extraReducers: {
    [fetchCategory.fulfilled](state, action) {
      state.currentCategory =
        getPreferences('category') !== null
          ? getPreferences('category').currentCategory
          : action.payload.categories?.[0].name
      state.categories = action.payload.categories
    },
  },
})
export const { setCategory } = CategoriesSlice.actions
export default CategoriesSlice.reducer
