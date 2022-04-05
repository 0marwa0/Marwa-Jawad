import React from 'react'
import './index.css'
class index extends React.Component {
  state = { loading: true, item: this.props.item }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.item?.id !== prevState.item?.id) {
      return {
        loading: true,
      }
    }
    return {}
  }

  render() {
    const loading = this.state.loading
    const src = loading
      ? require('../../assets/Icons/Loading.gif')
      : this.props.src
    const label = this.props.label
    return (
      <div className="lazy-loading-holder">
        <img
          src={src}
          alt=""
          onLoadedDataCapture={() => this.setState({ loading: true })}
          onLoad={() => this.setState({ loading: false })}
        />
        {label ? <div className="inStock">{label}</div> : null}
      </div>
    )
  }
}

export default index
