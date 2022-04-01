import React from 'react'
import { connect } from 'react-redux'
import withRouter from '../../components/Hoc'
class index extends React.Component {
  render() {
    const value = this.props.value
    const { name, type, selected } = this.props.item
    const isSwatch = type === 'swatch'
    return (
      <div
        onClick={() => {
          this.props.onSelect({ name, value })
        }}
        className={
          selected === value
            ? 'product-size-lg selected-item'
            : 'product-size-lg'
        }
        style={{
          backgroundColor: isSwatch ? value : 'white',
        }}
      >
        {!isSwatch ? value : ''}
      </div>
    )
  }
}
const state = (state) => {
  return {
    cart: state.cart.cart?.items,
  }
}
export default connect(state)(withRouter(index))
