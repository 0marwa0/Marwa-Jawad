import React from 'react'
import { connect } from 'react-redux'
import { setCategory, fetchCategory } from '../../store/categoriesSlice'
import Hoc from '../Hoc'
import './index.css'
import '../../App.css'
import { closeModal } from '../../store/modalSlice'
class Navbar extends React.Component {
  state = {
    currentCategory: this.props.currentCategory,
  }

  componentDidMount() {
    this.props.getCategories()
    // this.setState(() => ({ currentCategory: this.props.currentCategory }))
  }

  updateCategory = (category) => {
    this.props.changeCategory(category)
    this.setState(() => ({
      currentCategory: category.name,
      data: this.props.categories.categories,
    }))
  }

  render() {
    const categories = this.props.categories

    return categories?.map((category) => (
      <span
        key={category.name}
        onClick={() => {
          this.props.history('/')
          this.updateCategory(category.name)
        }}
        className={
          this.props.currentCategory === category.name ? 'activeTab' : ''
        }
      >
        {category.name}
      </span>
    ))
  }
}
const data = function (state) {
  return {
    categories: state.categories?.categories,
    currentCategory: state.categories.currentCategory,
  }
}

const dispatch = (dispatch) => {
  return {
    changeCategory: (data) => dispatch(setCategory(data)),
    getCategories: () => dispatch(fetchCategory()),
    closeModal: () => dispatch(closeModal()),
  }
}

export default connect(data, dispatch)(Hoc(Navbar))
