import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getPreferences, setPreferences } from './Api'
import { currencyQuery } from './queries'
export const fetchCurrency = createAsyncThunk(
  'productStore/fetchCurrencies',
  async () => {
    return await axios
      .post('http://localhost:4000/', { query: currencyQuery })
      .then((res) => res.data.data.currencies)
  }
)
const currencySlice = createSlice({
  name: 'currencies',
  initialState: {
    currencies: [],
    selectedCurrency:
      getPreferences('currency') !== null
        ? getPreferences('currency').currentCurrency
        : '$',
  },

  reducers: {
    setCurrency(state, action) {
      state.selectedCurrency = action.payload
      setPreferences('currency', {
        currentCurrency: action.payload,
      })
    },
  },
  extraReducers: {
    [fetchCurrency.fulfilled](state, action) {
      state.currencies = action.payload
      if (getPreferences('currency') === null) {
        state.currentCurrency = action.payload[0].symbol
        setPreferences('currency', {
          currentCurrency: action.payload[0].symbol,
        })
      }
    },
  },
})
export const { setCurrency } = currencySlice.actions
export default currencySlice.reducer
