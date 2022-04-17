import React from 'react'
import AttributeItem from './AttributeItem'

class Attributes extends React.Component {
  render() {
    const attributes =
      this.props.selectedAttributes.length !== 0
        ? this.props.selectedAttributes
        : this.props.product.attributes
    return (
      <div>
        {attributes?.map((attribute) => (
          <div className="Attribute-holder" key={attribute.name}>
            <p>{attribute?.name + ' :'}</p>
            <div className="flex">
              {attribute?.items.map((value) => (
                <AttributeItem
                  key={value.value}
                  value={value.value}
                  item={attribute}
                  onSelect={this.props.updateAttributes}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Attributes
