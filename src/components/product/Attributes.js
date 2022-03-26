import React from "react";
import AttributeItem from "./AttributeItem";
import { connect } from "react-redux";
class Attributes extends React.Component {
  render() {
    return (
      <div>
        {this.props.product.attributes?.map((attribute) => (
          <div className="Attribute-holder">
            <p>{attribute?.name + " :"}</p>
            <div className="flex">
              {attribute?.items.map((value) => (
                <AttributeItem
                  value={value.value}
                  item={attribute}
                  onSelect={this.props.updateAttributes}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
const state = (state) => {
  return {
    cart: state.cart.items,
  };
};
export default connect(state)(Attributes);
