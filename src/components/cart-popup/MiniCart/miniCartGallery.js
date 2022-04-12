import React from 'react'
import LeftIcon from '../../../assets/Icons/left.svg'
import RightIcon from '../../../assets/Icons/right.svg'
import LazyLoading from '../../LazyLoading'
import './cart.css'
import GalleryButton from './GalleryButton'
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
        <GalleryButton
          images={images}
          icon={LeftIcon}
          handleClick={() => this.perviousImage()}
          disable={prevAllowed}
        />

        <LazyLoading
          style="image-wrapper-s"
          src={images?.[this.state.currentImage]}
          item={this.props.product}
        />
        <GalleryButton
          images={images}
          icon={RightIcon}
          handleClick={() => this.nextImage()}
          disable={nextAllowed}
        />
      </div>
    )
  }
}

export default index
