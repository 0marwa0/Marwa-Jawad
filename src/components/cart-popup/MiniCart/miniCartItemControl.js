import React from 'react'
import { connect } from 'react-redux'
import { increase, decrease, removeProduct } from '../../../store/cartSlice'
import { ReactComponent as PlusIcon } from '../../../assets/Icons/plusIcon.svg'
import { ReactComponent as MinusIcon } from '../../../assets/Icons/minusIcon.svg'
import TrashIcon from '../../../assets/Icons/trash-icon.png'
import LazyLoading from '../../LazyLoading'
import './cart.css'
class CartItemControl extends React.Component {
  render() {
    const { id, count, gallery } = this.props.item

    return (
      <div className="flex">
        <div className="mini-cart-control">
          <div
            className="item-btn-sm"
            onClick={() => this.props.onIncrease(id)}
          >
            <PlusIcon className="control-btn" />
          </div>
          <div>{count}</div>
          <div className="item-btn-sm" onClick={() => this.props.decrease(id)}>
            <MinusIcon className="control-btn" />
          </div>
        </div>

        <div className="mini-cart-img">
          <LazyLoading src={gallery?.[0]} item={this.props.data} />
          <div className="trash-btn">
            <img
              src={TrashIcon}
              alt=""
              onClick={() => this.props.removeProduct(id)}
            />
          </div>
        </div>
      </div>
    )
  }
}

const dispatch = (dispatch) => {
  return {
    onIncrease: (id) => dispatch(increase(id)),
    decrease: (id) => dispatch(decrease(id)),
    removeProduct: (id) => dispatch(removeProduct(id)),
  }
}
export default connect(null, dispatch)(CartItemControl)
