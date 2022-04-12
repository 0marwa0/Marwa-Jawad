import React from 'react'
import { getPrice } from '../../UtilityFunctions'
import { removeProduct } from '../../store/cartSlice'
import { connect } from 'react-redux'
import TrashIcon from '../../assets/Icons/trash-icon.png'

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
          {attributes.map((item) => (
            <div className="attr-holder" key={item.name}>
              <span> {item.name}</span>
              <div className="flex">
                {item.items.map((value) => (
                  <div
                    key={value.value}
                    className={
                      value.value === item.selected
                        ? 'box-selected selected-item'
                        : 'box-container'
                    }
                    style={{
                      background: item.type === 'swatch' ? value.value : '',
                    }}
                  >
                    {item.type === 'text' ? value.value : ''}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
