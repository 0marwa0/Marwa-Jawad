import React from 'react'
import './cart.css'
import { connect } from 'react-redux'
import Pagination from '../../..//components/pagination'
import EmptyCart from '../../../assets/Icons/empty_cart.gif'
import CartItem from './miniCartItem'
import CartControl from './miniCartControl'
import { totalPrice } from '../../../UtilityFunctions'
import { closeDropdown } from '../../../store/dropdownSlice'
import PropTypes from 'prop-types'
class MiniCart extends React.Component {
  state = { currentPage: 1, perPage: 2 }
  static prototypes = {
    showMiniCart: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired,
  }

  nextPage = () => {
    const totalPage = Math.round(this.props.cart.length / this.state.perPage)
    if (totalPage !== this.state.currentPage) {
      console.log(totalPage, this.state.currentPage)
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

  render() {
    const items = this.props.cart ? this.props.cart : []
    const currency = this.props.selectedCurrency
    const lastIndex = this.state.currentPage * this.state.perPage
    const firstIndex = lastIndex - this.state.perPage
    const products = items.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(this.props.cart?.length / this.state.perPage)
    const totalCost = currency + ' ' + totalPrice(items, currency)

    return (
      <>
        <div
          className="mini-cart"
          onClick={(e) => {
            e.stopPropagation()
            this.props.showMiniCart()
            this.props.hideDropDown()
          }}
        >
          <span>
            <span className="bold-text">My bag {items ? items.length : 0}</span>
            <span> item</span>
          </span>
          {products?.length !== 0 ? (
            products ? (
              products.map((item) => <CartItem data={item} key={item.id} />)
            ) : (
              ''
            )
          ) : (
            <div className="center">
              <img src={EmptyCart} alt="empty cart" />
            </div>
          )}
        </div>
        <div className="mini-cart-total">
          <span>total :</span>
          {totalCost}
        </div>
        {totalPages > 1 ? (
          <div className="center">
            <Pagination
              totalPage={totalPages}
              currentPage={this.state.currentPage}
              onPrev={this.prevPage}
              onNext={this.nextPage}
            />
          </div>
        ) : (
          ''
        )}
        <CartControl items={items} closeModal={this.props.closeModal} />
      </>
    )
  }
}
const state = (state) => {
  return {
    selectedCurrency: state.currencies?.selectedCurrency,
    cart: state.cart.cart?.items,
    test: state.cart,
  }
}
const dispatch = (dispatch) => {
  return {
    hideDropDown: dispatch(closeDropdown()),
  }
}

export default connect(state, dispatch)(MiniCart)
