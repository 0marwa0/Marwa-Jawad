import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setPreferences, getPreferences } from "./Api";
const query = `
{
  categories{
    name
    products{
      id
      name
      brand
      gallery
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

`;
export const fetchCategory = createAsyncThunk(
  "productStore/fetchCategory",
  async () => {
    return await axios
      .post("http://localhost:4000/", { query: query })
      .then((res) => res.data.data);
  }
);
const CategorisSlice = createSlice({
  name: "Category",
  initialState: {
    categories: [],
    currentCategory:
      getPreferences("category") !== null
        ? getPreferences("category").currentCategory
        : {},
  },

  reducers: {
    setCategory(state, action) {
      state.currentCategory = action.payload;
      setPreferences("category", {
        currentCategory: action.payload,
      });
    },
  },
  extraReducers: {
    [fetchCategory.fulfilled](state, action) {
      if (getPreferences("category") === null) {
        state.currentCategory = action.payload.categories[0];
        setPreferences("category", {
          currentCategory: action.payload.categories[0],
        });
      }
      state.categories = action.payload.categories;
    },
  },
});
export const { setCategory } = CategorisSlice.actions;
export default CategorisSlice.reducer;
