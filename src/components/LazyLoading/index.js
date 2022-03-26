import React from "react";
class index extends React.Component {
  state = { loading: true };
  componentWillReceiveProps(nextProps) {
    if (nextProps.item?.id !== this.props.item?.id) {
      this.setState({ loading: true });
    }
  }
  render() {
    let loading = this.state.loading;
    let src = loading
      ? require("../../assets/Icons/Loading.gif")
      : this.props.src;

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
    );
  }
}

export default index;
