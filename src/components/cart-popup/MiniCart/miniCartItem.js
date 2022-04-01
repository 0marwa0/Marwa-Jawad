import React from 'react'
import CartAttribute from './miniCartAttribute'
import { getPrice } from '../../../UtilityFunctions'
import { connect } from 'react-redux'
import CartItemControl from './miniCartItemControl'
import './cart.css'
class CartControl extends React.Component {
  render() {
    const { brand, name, attributes, prices, id } = this.props.data
    const currency = this.props.currentCurrency
    const price = currency + ' ' + getPrice(prices, currency)

    return (
      <div className="item-info-cart">
        <div>
          <div className="text">{brand}</div>
          <div className="text">{name}</div>

          <div className="text bold-text">{price}</div>
          <CartAttribute items={attributes} />
        </div>
        <CartItemControl item={this.props.data} id={id} />
      </div>
    )
  }
}
const state = (state) => {
  return { currentCurrency: state.currencies.selectedCurrency }
}

export default connect(state)(CartControl)
