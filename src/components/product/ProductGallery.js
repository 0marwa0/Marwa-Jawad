import React from 'react'
import LazyLoading from '../LazyLoading'
class index extends React.Component {
  render() {
    const gallery = this.props.gallery
    return (
      <div className="product-gallery">
        <div className="product-images">
          {gallery?.map((src, i) => (
            <div key={i}>
              <LazyLoading src={src} item={this.props.item} />
            </div>
          ))}
        </div>

        <div className="main-image">
          <LazyLoading src={gallery?.[0]} item={this.props.item} />
        </div>
      </div>
    )
  }
}

export default index
