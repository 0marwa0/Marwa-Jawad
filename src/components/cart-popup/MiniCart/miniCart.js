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
  state = { currentPage: 1, perPage: 2, cart: this.props.cart }
  static prototypes = {
    showMiniCart: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.cart.count === prevState.cart.count ||
      nextProps.cart.length !== prevState.cart.length
    )
      return {
        cart: nextProps.cart,
      }
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
    const items = this.state.cart
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
          }}
        >
          <span>
            <span className="bold-text">My bag {items ? items.length : 0}</span>
            <span> item</span>
            {items.length}
          </span>
          {items.length !== 0 ? (
            products.map((item) => <CartItem data={item} key={item.cartId} />)
          ) : (
            <div className="center">
              <img src={EmptyCart} alt="empty cart" />
            </div>
          )}
        </div>
        <div className="mini-cart-total">
          <span>Total :</span>
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
  }
}
const dispatch = (dispatch) => {
  return {
    hideDropDown: dispatch(closeDropdown()),
  }
}

export default connect(state, dispatch)(MiniCart)
