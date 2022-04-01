import React from 'react'
class index extends React.Component {
  state = { loading: true, item: this.props.item }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.item?.id !== prevState.item?.id) {
      return {
        loading: true,
      }
    }
  }

  render() {
    const loading = this.state.loading
    const src = loading
      ? require('../../assets/Icons/Loading.gif')
      : this.props.src

    return (
      <div>
        <img
          src={src}
          alt=""
          width="100%"
          height="100%"
          onLoadedDataCapture={() => this.setState({ loading: true })}
          onLoad={() => this.setState({ loading: false })}
        />
      </div>
    )
  }
}

export default index
