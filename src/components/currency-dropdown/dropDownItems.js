import React from 'react'

class index extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.show
            ? 'select-box--items show-select'
            : 'select-box--items hide-select'
        }
      >
        {this.props.currencies.map((item) => (
          <div
            className={
              this.props.selectedCurrency === item.symbol
                ? 'selected-drop-item'
                : ''
            }
            key={item.symbol}
            onClick={() => this.props.selectItem(item.symbol)}
          >
            {item.symbol} {item.label}
          </div>
        ))}
      </div>
    )
  }
}

export default index
