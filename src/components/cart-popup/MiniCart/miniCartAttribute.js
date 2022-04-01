import React from 'react'
class index extends React.Component {
  render() {
    return (
      <div className="attributes-holder">
        {this.props.items?.map((item) => (
          <span className="attributes-item" key={item.name}>
            <span>{item.name}</span>
            <div
              className={
                item.type === 'swatch' ? 'product-color' : 'product-text'
              }
              style={{
                background: item.type === 'swatch' ? item.selected : 'white',
              }}
            >
              {item.type === 'text' ? item.selected : ''}
            </div>
          </span>
        ))}
      </div>
    )
  }
}

export default index
