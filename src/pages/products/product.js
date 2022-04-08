import React from 'react'
import withRouter from '../../components/Hoc/index'
import { fetchProduct } from '../../store/productSlice'
import { fetchCurrency } from '../../store/currencySlice'
import {
  addProduct,
  getCart,
  removeProduct,
  updateCart,
} from '../../store/cartSlice'
import { connect } from 'react-redux'
import Attributes from '../../components/product/Attributes'
import ProductGallery from '../../components/product/ProductGallery'
import { getPrice, hasNewAttributes } from '../../UtilityFunctions'
import { v1 as uuidv1 } from 'uuid'
class ProductInfo extends React.Component {
  state = {
    attributes: [],
    cart: [],
  }

  componentDidMount() {
    this.props.getProduct(this.props.id)
    this.props.getCurrency()
    this.props.getCart()
  }

  updateAttributes = (items) => {
    const savedAttributes = this.state.attributes.length
    const attributes =
      savedAttributes === 0
        ? this.props.product.attributes
        : this.state.attributes

    // update the chosen attribute
    const updateAttributes = attributes.map((item) => {
      if (item.name === items.name) {
        return { ...item, selected: items.value }
      } else {
        return item
      }
    })

    this.setState(() => ({
      attributes: updateAttributes,
    }))
  }

  addItem = (item) => {
    let attributes = this.state.attributes
    const inStock = item.inStock
    // check if the user didn't pick any attributes
    if (attributes.length === 0) {
      attributes = item.attributes
    }
    const product = {
      cartId: uuidv1(),
      ...item,
      count: 1,
      attributes,
    }

    if (inStock) {
      const store = this.props.cart
      const ValidProduct = hasNewAttributes(store, product)
      if (ValidProduct) {
        this.props.addProduct(product)
      }

      this.setState({ attributes: [] })
    }
  }

  render() {
    const product = this.props.product
    const { brand, name, gallery, prices, description, inStock } = product

    const price = getPrice(prices, this.props.selectedCurrency)
    const label = inStock ? undefined : 'out-of-stock'

    return (
      <div className="product-page">
        <ProductGallery gallery={gallery} />
        <div className="product">
          <h1>{brand}</h1>
          <h1>{name}</h1>
          <p>{label}</p>
          <Attributes
            selectedAttributes={this.state.attributes}
            updateAttributes={this.updateAttributes}
            product={product}
          />

          <div className="Attribute-holder">
            PRICE:
            <h1>{this.props.selectedCurrency + price}</h1>
          </div>

          <button
            className="AddToCart"
            onClick={() => this.addItem(this.props.product)}
          >
            ADD TO CART
          </button>
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    )
  }
}
const state = (state) => {
  return {
    product: state.product.product,
    cart: state.cart.cart?.items,
    selectedCurrency: state.currencies.selectedCurrency,
  }
}
const dispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
    getCurrency: () => dispatch(fetchCurrency()),
    addProduct: (item) => dispatch(addProduct(item)),
    updateCart: (cart) => dispatch(updateCart(cart)),
    getCart: () => dispatch(getCart()),
    removeProduct: (id) => dispatch(removeProduct(id)),
  }
}
export default connect(state, dispatch)(withRouter(ProductInfo))
