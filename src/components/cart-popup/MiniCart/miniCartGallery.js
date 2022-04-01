import React from 'react'
import LeftIcon from '../../../assets/Icons/left.svg'
import RightIcon from '../../../assets/Icons/right.svg'
import LazyLoading from '../../LazyLoading'
import './cart.css'
class index extends React.Component {
  state = {
    currentImage: 0,
    nextAllowed: true,
    prevAllowed: false,
  }

  nextImage = () => {
    this.setState(() => ({
      currentImage: this.state.currentImage + 1,
      loading: true,
    }))
  }

  perviousImage = () => {
    this.setState(() => ({
      currentImage: this.state.currentImage - 1,
    }))
  }

  render() {
    const images = this.props.images
    const currentIndex = this.state.currentImage
    const gallery = images?.length - 1
    const prevAllowed = currentIndex !== 0 && gallery > 0
    const nextAllowed = currentIndex < gallery

    return (
      <div className="mini-cart-gallery">
        <button
          disabled={prevAllowed}
          style={{
            cursor: prevAllowed ? 'pointer' : 'not-allowed',
          }}
          className="mini-cart-gallery-btn"
          onClick={this.perviousImage}
        >
          <img src={LeftIcon} alt="icon" />
        </button>
        <LazyLoading
          src={images?.[this.state.currentImage]}
          item={this.props.product}
        />

        <button
          disabled={nextAllowed}
          style={{
            cursor: nextAllowed ? 'pointer' : 'not-allowed',
          }}
          className="mini-cart-gallery-btn"
          onClick={this.nextImage}
        >
          <img src={RightIcon} alt="icon" />
        </button>
      </div>
    )
  }
}

export default index
