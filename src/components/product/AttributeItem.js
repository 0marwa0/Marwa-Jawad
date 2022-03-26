import React from "react";
import { connect } from "react-redux";
import withRouter from "../../components/Hoc";
class index extends React.Component {
  render() {
    let value = this.props.value;
    let { name, type, selected } = this.props.item;
    let isSwatch = type === "swatch" ? true : false;
    return (
      <div
        onClick={() => {
          this.props.onSelect({ name, value });
        }}
        className={
          selected === value
            ? "product-size-lg selected-item"
            : "product-size-lg"
        }
        style={{
          backgroundColor: isSwatch ? value : "white",
        }}
      >
        {!isSwatch ? value : ""}
      </div>
    );
  }
}
const state = (state) => {
  return {
    cart: state.cart.cart?.items,
  };
};
export default connect(state)(withRouter(index));
