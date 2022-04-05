import React from 'react'
import MiniCartGallery from '../../components/cart-popup/MiniCart/miniCartGallery'
import { ReactComponent as PlusIcon } from '../../assets/Icons/plusIcon.svg'
import { ReactComponent as MinusIcon } from '../../assets/Icons/minusIcon.svg'
import './index.css'
class index extends React.Component {
  render() {
    const { count, gallery } = this.props.item
    return (
      <div className="item-cart-control">
        <div className="flex-col">
          <div className="item-btn" onClick={this.props.increase}>
            <span>
              <PlusIcon className="btn-icon" />
            </span>
          </div>
          <div>{count}</div>
          <div className="item-btn" onClick={this.props.decrease}>
            <MinusIcon className="btn-icon" />
          </div>
        </div>
        <MiniCartGallery images={gallery} product={this.props.item} />
      </div>
    )
  }
}

export default index
