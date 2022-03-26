import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import currencySlice from "./currencySlice";
import cartSlice from "./cartSlice";
import categoriesSlice from "./categoriesSlice";
import modalSlice from "./modalSlice";
import dropdownSlice from "./dropdownSlice";
const store = configureStore({
  reducer: {
    products: productSlice,
    currencies: currencySlice,
    cart: cartSlice,
    categories: categoriesSlice,
    modal: modalSlice,
    dropdown: dropdownSlice,
  },
});
export default store;
