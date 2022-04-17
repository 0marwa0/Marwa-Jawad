import React from 'react'
import './cart.css'
import { connect } from 'react-redux'
import EmptyCart from '../../../assets/Icons/empty_cart.gif'
import CartItem from './miniCartItem'
import CartControl from './miniCartControl'
import { totalPrice } from '../../../UtilityFunctions'
import { closeDropdown } from '../../../store/dropdownSlice'

class MiniCart extends React.Component {
  state = { currentPage: 1, perPage: 2, cart: this.props.cart }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.cart.count === prevState.cart.count ||
      nextProps.cart.length !== prevState.cart.length
    )
      return {
        cart: nextProps.cart,
      }
  }

  render() {
    const items = this.state.cart
    const currency = this.props.selectedCurrency
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
            <span className="bold-text">My bag, </span>
            <span>
              {items.length} {`item${items.length <= 1 ? '' : 's'}`}
            </span>
          </span>
          {items.length !== 0 ? (
            this.props.cart.map((item) => (
              <CartItem data={item} key={item.cartId} />
            ))
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
