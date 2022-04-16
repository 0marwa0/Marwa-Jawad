import React from 'react'
import './index.css'
import { connect } from 'react-redux'
import { decrease, increase, removeProduct } from '../../store/cartSlice'
import CartItem from './cartItem'
import ItemControl from './itemControl'

class Cart extends React.Component {
  render() {
    const currency = this.props.selectedCurrency

    return (
      <>
        <h1 className="bold-text">Cart</h1>
        <div className="cart-page">
          {this.props.cart?.map((item) => (
            <div className="cart-page-item" key={item.cartId}>
              <CartItem item={item} currency={currency} />
              <ItemControl
                item={item}
                increase={() => this.props.increase(item.cartId)}
                decrease={() => this.props.decrease(item.cartId)}
              />
            </div>
          ))}
        </div>
      </>
    )
  }
}
const data = (state) => {
  return {
    cart: state.cart.cart?.items,
    selectedCurrency: state.currencies.selectedCurrency,
  }
}

const dispatch = (dispatch) => {
  return {
    deleteItem: (id) => dispatch(removeProduct(id)),
    increase: (id) => dispatch(increase(id)),
    decrease: (id) => dispatch(decrease(id)),
  }
}

export default connect(data, dispatch)(Cart)
