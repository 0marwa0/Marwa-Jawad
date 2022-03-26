import React from "react";
import { connect } from "react-redux";
import { fetchCategory } from "../../store/categoriesSlice";
import { fetchCurrency } from "../../store/currencySlice";
import ProductCard from "../../components/product/card";
import Pagination from "../../components/pagination";
import "./index.css";
class Products extends React.Component {
  state = { currentPage: 1, perPage: 6 };
  componentDidMount() {
    this.props.getCategories();
    this.props.getCurrency();
  }
  nextPage = () => {
    const totalPage = Math.ceil(
      this.props.products.length / this.state.perPage
    );
    if (totalPage !== this.state.currentPage) {
      this.setState(() => ({
        currentPage: this.state.currentPage + 1,
      }));
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 1)
      this.setState(() => ({
        currentPage: this.state.currentPage - 1,
      }));
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.products !== this.props.products) {
      this.setState({ currentPage: 1 });
    }
  }
  render() {
    let products = this.props.products || [];
    let lastIndex = this.state.currentPage * this.state.perPage;
    let firstIndex = lastIndex - this.state.perPage;
    products = products?.slice(firstIndex, lastIndex);
    let total = Math.ceil(this.props.products?.length / this.state.perPage);
    return (
      <div>
        <h1 className="product-title">Category Name </h1>
        <Pagination
          totalPage={total}
          currentPage={this.state.currentPage}
          onNext={this.nextPage}
          onPrev={this.prevPage}
          key={this.props.products}
        />
        <div className="cards-holder">
          {products?.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              selectedCurrency={this.props.currencies.selectedCurrency}
            />
          ))}
        </div>
      </div>
    );
  }
}
const state = function (state) {
  return {
    products:
      state.categories.currentCategory.length !== 0
        ? state.categories.currentCategory.products
        : state.categories.categories[0]?.products,
    currencies: state.currencies,
  };
};

const dispatch = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategory()),
    getCurrency: () => dispatch(fetchCurrency()),
  };
};

export default connect(state, dispatch)(Products);
