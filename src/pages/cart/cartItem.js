import React from 'react'
import { getPrice } from '../../UtilityFunctions'
import { removeProduct } from '../../store/cartSlice'
import { connect } from 'react-redux'
import TrashIcon from '../../assets/Icons/trash-icon.png'
import CartAttributes from './cartAttributes'
class index extends React.Component {
  render() {
    const { name, brand, attributes, prices, cartId } = this.props.item
    const currency = this.props.currency
    const price = currency + ' ' + getPrice(prices, currency)
    return (
      <>
        <div className="item-cart-info">
          <div className="bold-text">{brand}</div>
          <div className="flex">
            {name}
            <img
              src={TrashIcon}
              alt="icon"
              onClick={() => this.props.removeItem(cartId)}
              className="trash_icon"
            />
          </div>
          <div className="bold-text">{price}</div>
          <CartAttributes attributes={attributes} />
        </div>
      </>
    )
  }
}
const dispatch = (dispatch) => {
  return {
    removeItem: (id) => dispatch(removeProduct(id)),
  }
}
export default connect(null, dispatch)(index)
