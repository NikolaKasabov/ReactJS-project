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
    fetch(`http://localhost:5000/products/${category}`, {
      // method: "GET",
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      //   'Cache': 'no-cache'
      // },
      credentials: 'include', // without this react will NOT send the cookie with the request
    })
      .then((dataAsReadableStream) => dataAsReadableStream.json())
      .then((dataAsJson) => this.setState({ products: dataAsJson }))
      .catch((err) => console.log(err));
  }

  // on props change...
  componentDidUpdate(prevProps) {
    const { category } = this.props;
    if (category !== prevProps.category) {
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