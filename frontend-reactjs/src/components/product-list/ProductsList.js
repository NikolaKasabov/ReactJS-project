import React, { Component } from 'react';
import Product from '../product/Product';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }

  fetchProductsAndAddToState(category) {
    fetch(`http://localhost:5000/products/${category}`)
      .then((dataAsReadableStream) => dataAsReadableStream.json())
      .then((dataAsJson) => {
        this.setState({ products: dataAsJson })
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate(nextProps) {
    const { category } = this.props;
    if (category !== nextProps.category) {
      this.fetchProductsAndAddToState(category);
    }
  }

  render() {
    return (
      <div className="products-container">
        {this.state.products.map((product) => {
          return (<Product
            key={product._id}
            imageUrl={product.imageUrl}
            description={product.description}
            price={product.price}
          />)
        })}
      </div>
    )
  }
}

export default ProductsList;