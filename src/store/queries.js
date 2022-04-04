export const productQuery = (id) => {
  return `
{
    product(id:"${id}"){
      id
      name  
      brand
      gallery
      description
      inStock
      attributes{
        type
        name
        items{
          value
        }
      }
      prices{
        currency{
          symbol
          label
        }
        amount
      }
    }
}

`
}
