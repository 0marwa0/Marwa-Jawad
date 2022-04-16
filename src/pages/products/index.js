import React from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../store/productsSlice'

import ProductCard from '../../components/product/card'
import Pagination from '../../components/pagination'
import './index.css'
class Products extends React.Component {
  state = {
    currentPage: 1,
    perPage: 6,
    products: this.props.products,
    currentCategory: this.props.currentCategory,
  }

  componentDidMount() {
    this.props.getProducts(this.props.currentCategory)
  }

  nextPage = () => {
    const totalPage = Math.ceil(this.props.products.length / this.state.perPage)
    if (totalPage !== this.state.currentPage) {
      this.setState(() => ({
        test: this.state.test + 1,
        currentPage: this.state.currentPage + 1,
      }))
    }
  }

  prevPage = () => {
    if (this.state.currentPage > 1)
      this.setState(() => ({
        currentPage: this.state.currentPage - 1,
      }))
  }

  componentDidUpdate(nextProps) {
    if (nextProps.currentCategory !== this.props.currentCategory) {
      this.props.getProducts(this.props.currentCategory)
      return true
    } else {
      return false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentCategory !== prevState.currentCategory) {
      return { currentPage: 1 }
    }
    return {}
  }

  render() {
    let products = this.props.products
    const lastIndex = this.state.currentPage * this.state.perPage
    const firstIndex = lastIndex - this.state.perPage
    products = products ? products.slice(firstIndex, lastIndex) : []
    const total = Math.ceil(this.props.products?.length / this.state.perPage)
    return (
      <div>
        <h1 className="category-title">{this.props.currentCategory} </h1>
        <Pagination
          totalPage={total}
          currentPage={this.state.currentPage}
          onNext={this.nextPage}
          onPrev={this.prevPage}
          // key={this.props.products}
        />

        <div className="cards-holder">
          {products.map((item) => (
            <ProductCard
              style="image-wrapper-m"
              key={item.id}
              product={item}
              selectedCurrency={this.props.currencies.selectedCurrency}
            />
          ))}
        </div>
      </div>
    )
  }
}
const state = function (state) {
  return {
    products: state.products.products,
    currencies: state.currencies,
    currentCategory: state.categories.currentCategory,
  }
}

const dispatch = (dispatch) => {
  return {
    getProducts: (category) => dispatch(fetchProducts(category)),
  }
}

export default connect(state, dispatch)(Products)
