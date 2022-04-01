import { createSlice } from '@reduxjs/toolkit'

const ModalSlice = createSlice({
  name: 'modal',
  initialState: {
    showModal: false,
  },

  reducers: {
    showModal(state) {
      state.showModal = true
    },
    closeModal(state) {
      state.showModal = false
    },
  },
})
export const { showModal, closeModal } = ModalSlice.actions
export default ModalSlice.reducer
