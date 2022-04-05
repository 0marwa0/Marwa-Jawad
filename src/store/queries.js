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
export const currencyQuery = `
{
  currencies{
    label
    symbol
  }
}
`
export const categoriesQuery = `
{
  categories{
    name
  }
}

`
export const productsQuery = (category) => `
{
  category(input:{title:"${category}"}){
    products{
      id
      name
      brand
      gallery
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
}

`
