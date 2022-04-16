import React from 'react'

class index extends React.Component {
  render() {
    return (
      <button
        className={
          this.props.disable ? 'pagination-btn-active' : 'pagination-btn'
        }
        onClick={(e) => {
          e.stopPropagation()
          this.props.clickHandle()
        }}
      >
        <img src={this.props.icon} alt="icon" />
      </button>
    )
  }
}

export default index
