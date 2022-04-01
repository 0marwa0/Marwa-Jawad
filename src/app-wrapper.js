import React from 'react'
import Navbar from './components/navbar'
import { connect } from 'react-redux'
import { closeDropdown } from './store/dropdownSlice'
import { closeModal } from './store/modalSlice'
import { fetchCategory } from './store/categoriesSlice'
class index extends React.Component {
  componentDidMount() {
    document.addEventListener('scroll', this.onScroll, true)
    this.props.getCategories()
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify({ items: [] }))
    }
  }

  close = () => {
    this.props.closeModal()
    this.props.hideDropdown()
  }

  onScroll = () => {
    if (window.scrollY > 0) {
      this.close()
    }
  }

  render() {
    return (
      <div
        onClick={() => {
          this.props.closeModal()
          this.props.hideDropdown()
        }}
        onScroll={this.onScroll}
      >
        <div className="app-container">
          <Navbar />
          {this.props.children}
        </div>
      </div>
    )
  }
}
const state = (state) => {
  return {
    showModal: state.modal.showModal,
    currentCategory: state.categories,
    currentCurrency: state.currencies.selectedCurrency,
  }
}
const dispatch = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategory()),
    hideDropdown: () => dispatch(closeDropdown()),
    closeModal: () => dispatch(closeModal()),
  }
}
export default connect(state, dispatch)(index)
