import React from 'react'
import Hoc from '../../Hoc'
class index extends React.Component {
  render() {
    return (
      <span className="mini-cart-btns">
        {this.props.items.length !== 0 ? (
          <span
            className="cart-btn cart-btn-view"
            onClick={(e) => {
              e.stopPropagation()
              this.props.closeModal()
              this.props.history('/cart')
            }}
          >
            VIEW BAG
          </span>
        ) : null}

        <span className="cart-btn cart-btn-check-out">CHECK OUT</span>
      </span>
    )
  }
}

export default Hoc(index)
