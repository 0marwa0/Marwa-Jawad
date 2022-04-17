import React from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../store/productsSlice'

import ProductCard from '../../components/product/card'
import Pagination from '../../components/pagination'
import './index.css'
import { next, prev } from '../../store/categoriesSlice'
class Products extends React.Component {
  state = {
    perPage: 6,
    products: this.props.products,
    currentCategory: this.props.currentCategory,
  }

  componentDidMount() {
    this.props.getProducts(this.props.currentCategory)
  }

  nextPage = () => {
    this.forceUpdate()

    const totalPage = Math.ceil(this.props.products.length / this.state.perPage)
    if (totalPage !== this.props.currentPage) {
      this.props.next()
    }
  }

  prevPage = () => {
    if (this.props.currentPage > 1) {
      this.props.prev()
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.currentCategory !== this.props.currentCategory) {
      this.props.getProducts(this.props.currentCategory)
      return true
    } else {
      return false
    }
  }

  render() {
    let products = this.props.products
    const lastIndex = this.props.currentPage * this.state.perPage
    const firstIndex = lastIndex - this.state.perPage
    products = products ? products.slice(firstIndex, lastIndex) : []
    const total = Math.ceil(this.props.products?.length / this.state.perPage)
    const category = this.props.currentCategory

    return (
      <div>
        <h1 className="category-title">{category} </h1>

        <Pagination
          totalPage={total}
          currentPage={this.props.currentPage}
          onNext={() => this.nextPage()}
          onPrev={this.prevPage}
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
    currentCategory: state.categories?.currentCategory,
    currentPage: state.categories?.currentPage,
  }
}

const dispatch = (dispatch) => {
  return {
    next: () => dispatch(next()),
    prev: () => dispatch(prev()),
    getProducts: (category) => dispatch(fetchProducts(category)),
  }
}

export default connect(state, dispatch)(Products)
