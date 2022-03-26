import React from "react";
import Logo from "../../assets/Icons/cart-logo.svg";
import CurrencyUi from "../currency-dropdown";
import { connect } from "react-redux";
import "./index.css";
import "../../App.css";
import MiniCart from "../cart-popup/MiniCart";
import { closeModal } from "../../store/modalSlice";
import Categories from "./categories";
class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-holder" onClick={this.props.closeModal}>
        <span className="tabs">
          <Categories />
        </span>
        <img src={Logo} alt="logo" />
        <div className="flex">
          <CurrencyUi />
          <MiniCart />
        </div>
      </div>
    );
  }
}

const dispatch = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(null, dispatch)(Navbar);
