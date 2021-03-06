import React from 'react'
import LazyLoading from '../LazyLoading'
import './index.css'
class index extends React.Component {
  state = { mainImage: '' }
  onDisplay = (src) => {
    this.setState(() => ({ mainImage: src }))
  }

  render() {
    const gallery = this.props.gallery
    return (
      <div className="product-gallery">
        <div className="product-images">
          {gallery?.map((src, i) => (
            <div key={i} onClick={() => this.onDisplay(src)}>
              <LazyLoading
                src={src}
                item={this.props.item}
                style="image-wrapper-s"
              />
            </div>
          ))}
        </div>

        <div className="main-image">
          <LazyLoading
            style="image-wrapper"
            src={this.state.mainImage ? this.state.mainImage : gallery?.[0]}
            item={this.props.item}
          />
        </div>
      </div>
    )
  }
}

export default index
