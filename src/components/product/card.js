import React from 'react'
import './index.css'
import cartIcon from '../../assets/Icons/cartIcon.svg'
import Hoc from '../Hoc'
import { getPrice, hasNewAttributes } from '../../UtilityFunctions'
import LazyLoading from '../LazyLoading'
import { addProduct } from '../../store/cartSlice'
import { connect } from 'react-redux'
import { v1 as uuidv1 } from 'uuid'
class index extends React.Component {
  addToCart = (item) => {
    const product = {
      cartId: uuidv1(),
      ...item,
      count: 1,
    }

    if (item.inStock) {
      const store = this.props.cart
      const ValidProduct = hasNewAttributes(store, product)
      if (ValidProduct) {
        this.props.addProduct(product)
      }
    }
  }

  render() {
    const { brand, name, gallery, prices, id, inStock } = this.props.product
    const currency = this.props.selectedCurrency
    const label = inStock ? undefined : 'OUT OF STOCK'
    const price = currency + ' ' + getPrice(prices, currency)
    const product = { ...this.props.product, count: 1 }

    return (
      <div
        className="card-holder"
        key={id}
        onClick={() => {
          this.props.history(`/product/${id}`)
        }}
      >
        <div className="card-image">
          <LazyLoading
            src={gallery[0]}
            item={this.props.product}
            label={label}
          />
        </div>
        <div
          className={
            inStock ? 'icon-cart-holder' : 'icon-cart-holder hidePointer'
          }
          onClick={(e) => {
            e.stopPropagation()
            this.addToCart(product)
          }}
        >
          <div className="icon-cart">
            <img src={cartIcon} alt="icon" />
          </div>
        </div>
        <p className="text">
          {brand} {name}
        </p>
        <div className="bold-text">{price}</div>
      </div>
    )
  }
}
const state = (state) => {
  return {
    cart: state.cart.cart?.items,
  }
}
const dispatch = (dispatch) => {
  return {
    addProduct: (item) => dispatch(addProduct(item)),
  }
}
export default connect(state, dispatch)(Hoc(index))
