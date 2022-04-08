import React from 'react'
class index extends React.Component {
  render() {
    const showButton = this.props.images.length > 1
    return showButton ? (
      <button
        disabled={!this.props.disable}
        className={
          this.props.disable
            ? 'mini-cart-gallery-btn'
            : 'mini-cart-gallery-btn hidePointer'
        }
        onClick={this.props.handleClick}
      >
        <img src={this.props.icon} alt="icon" />
      </button>
    ) : null
  }
}

export default index
