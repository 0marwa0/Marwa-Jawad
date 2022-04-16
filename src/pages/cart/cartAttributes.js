import React from 'react'

class index extends React.Component {
  render() {
    return (
      <>
        {this.props.attributes.map((item) => (
          <div className="attr-holder" key={item.name}>
            <span> {item.name}</span>
            <div className="flex">
              {item.items.map((value) => (
                <div
                  key={value.value}
                  className={
                    value.value === item.selected
                      ? 'box-selected selected-item'
                      : 'box-container'
                  }
                  style={{
                    background: item.type === 'swatch' ? value.value : '',
                  }}
                >
                  {item.type === 'text' ? value.value : ''}
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    )
  }
}

export default index
