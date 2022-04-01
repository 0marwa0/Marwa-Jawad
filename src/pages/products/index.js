import React from 'react'
import { connect } from 'react-redux'
import { fetchCategory } from '../../store/categoriesSlice'
import { fetchCurrency } from '../../store/currencySlice'
import ProductCard from '../../components/product/card'
import Pagination from '../../components/pagination'
import './index.css'
class Products extends React.Component {
  state = { currentPage: 1, perPage: 6, products: this.props.products }
  componentDidMount() {
    this.props.getCategories()
    this.props.getCurrency()
  }

  nextPage = () => {
    const totalPage = Math.ceil(this.props.products.length / this.state.perPage)
    if (totalPage !== this.state.currentPage) {
      this.setState(() => ({
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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.products !== prevState.products) {
      return { currentPage: 1 }
    }
    return {}
  }

  render() {
    let products = this.props.products || []
    const lastIndex = this.state.currentPage * this.state.perPage
    const firstIndex = lastIndex - this.state.perPage
    products = products?.slice(firstIndex, lastIndex)
    const total = Math.ceil(this.props.products?.length / this.state.perPage)
    return (
      <div>
        <h1 className="product-title">{this.props.categoryName} </h1>
        <Pagination
          totalPage={total}
          currentPage={this.state.currentPage}
          onNext={this.nextPage}
          onPrev={this.prevPage}
          key={this.props.products}
        />
        <div className="cards-holder">
          {products?.map((item) => (
            <ProductCard
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
    products:
      state.categories.currentCategory.length !== 0
        ? state.categories.currentCategory.products
        : state.categories.categories[0]?.products,

    currencies: state.currencies,
    categoryName: state.categories.currentCategory.name,
  }
}

const dispatch = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategory()),
    getCurrency: () => dispatch(fetchCurrency()),
  }
}

export default connect(state, dispatch)(Products)
