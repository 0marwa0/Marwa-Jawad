import React from 'react'
import './index.css'
import cartIcon from '../../assets/Icons/cartIcon.svg'
import Hoc from '../Hoc'
import { getPrice } from '../../UtilityFunctions'
import LazyLoading from '../LazyLoading'
import { addProduct } from '../../store/cartSlice'
import { connect } from 'react-redux'
class index extends React.Component {
  render() {
    const { brand, name, gallery, prices, id, inStock } = this.props.product
    const currency = this.props.selectedCurrency
    const label = inStock ? undefined : 'OUT OF STOCK'
    const price = currency + ' ' + getPrice(prices, currency)
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
            this.props.addProduct(this.props.product)
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
const dispatch = (dispatch) => {
  return {
    addProduct: (item) => dispatch(addProduct(item)),
  }
}
export default connect(null, dispatch)(Hoc(index))
