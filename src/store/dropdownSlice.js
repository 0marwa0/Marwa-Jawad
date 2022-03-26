import { createSlice } from "@reduxjs/toolkit";

const DropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    show: false,
  },

  reducers: {
    showDropdown(state) {
      state.show = true;
    },
    closeDropdown(state) {
      state.show = false;
    },
  },
});
export const { showDropdown, closeDropdown } = DropdownSlice.actions;
export default DropdownSlice.reducer;
