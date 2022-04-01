import React from 'react'
import './index.css'
import { connect } from 'react-redux'
import {
  addProduct,
  decrease,
  increase,
  removeProduct,
} from '../../store/cartSlice'
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
            <div className="cart-page-item" key={item.id}>
              <CartItem item={item} currency={currency} />
              <ItemControl
                item={item}
                increase={() => this.props.increase(item.id)}
                decrease={() => this.props.decrease(item.id)}
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
    addItem: (item) => dispatch(addProduct(item)),
    deleteItem: (id) => dispatch(removeProduct(id)),
    increase: (id) => dispatch(increase(id)),
    decrease: (id) => dispatch(decrease(id)),
  }
}

export default connect(data, dispatch)(Cart)
