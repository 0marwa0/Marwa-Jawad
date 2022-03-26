import React from "react";
import withRouter from "../../components/Hoc/index";
import { fetchProduct } from "../../store/productSlice";
import { fetchCurrency } from "../../store/currencySlice";
import { addProduct, getCart, removeProduct } from "../../store/cartSlice";
import { connect } from "react-redux";
import Attributes from "../../components/product/Attributes";
import ProductGallery from "../../components/product/ProductGallery";
import { getPrice } from "../../UtilityFunctions";
class ProductInfo extends React.Component {
  state = {
    attributes: [],
  };
  componentDidMount() {
    this.props.getProduct(this.props.id);
    this.props.getCurrency();
    this.props.getCart();
  }

  updateAttributes = (items) => {
    let savedAttributes = this.state.attributes.length;
    let attributes =
      savedAttributes === 0
        ? this.props.products.attributes
        : this.state.attributes;

    //update the chosen attribute
    let updateAttributes = attributes.map((item) => {
      if (item.name === items.name) {
        return { ...item, selected: items.value };
      } else {
        return item;
      }
    });

    this.setState(() => ({
      attributes: updateAttributes,
    }));
  };
  addItem = (item) => {
    let attributes = this.state.attributes;
    //check if the user didn't pick any attributes
    if (attributes.length === 0) {
      attributes = item.attributes;
    }
    let product = {
      ...item,
      count: 1,
      attributes,
    };
    this.props.addProduct(product);
    this.setState({ attributes: [] });
  };
  render() {
    let products = this.props.products;
    let { id, brand, name, gallery, prices, description } = products;
    let inCart = this.props.cart?.some((item) => item.id === id);
    // check if the item is already add to the cart
    // so we can show the item from the cart
    let product = inCart
      ? this.props.cart.filter((item) => item.id === id)[0]
      : this.state.attributes.length !== 0
      ? { ...this.props.products, attributes: this.state.attributes }
      : this.props.products;
    let price = getPrice(prices, this.props.selectedCurrency);

    return (
      <div className="product-page">
        <ProductGallery gallery={gallery} />
        <div className="product">
          <h1>{brand}</h1>
          <h1>{name}</h1>
          <Attributes
            updateAttributes={this.updateAttributes}
            product={product}
          />

          <div className="Attribute-holder">
            PRICE:
            <h1>{this.props.selectedCurrency + price}</h1>
          </div>

          <button
            className="AddToCart"
            onClick={() =>
              inCart
                ? this.props.removeProduct(id)
                : this.addItem(this.props.products)
            }
          >
            {inCart ? "REMOVE FROM CART" : "ADD TO CART"}
          </button>
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    );
  }
}
const state = (state) => {
  return {
    products: state.products.product,
    cart: state.cart.cart?.items,
    selectedCurrency: state.currencies.selectedCurrency,
  };
};
const dispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
    getCurrency: () => dispatch(fetchCurrency()),
    addProduct: (item) => dispatch(addProduct(item)),
    getCart: () => dispatch(getCart()),
    removeProduct: (id) => dispatch(removeProduct(id)),
  };
};
export default connect(state, dispatch)(withRouter(ProductInfo));
