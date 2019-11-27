import React, { Component } from 'react';
import ProductCard from '../productCard/ProductCard';
import './styles.css';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    }
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    this.fetchProductsAndAddToState(category);
  }

  // update state on prop changes
  componentDidUpdate(prevProps) {
    const { category } = this.props.match.params;
    const prevCategory = prevProps.match.params.category;

    if (category !== prevCategory) {
      this.fetchProductsAndAddToState(category);
    }
  }

  // get selected category products from the express server and add them to state
  fetchProductsAndAddToState = (category) => {
    fetch(`http://localhost:5000/products/${category}`, {
      // method: "GET",
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      //   'Cache': 'no-cache'
      // },
      credentials: 'include', // without this react will NOT send the cookies with the request to the server
    }).then((dataAsReadableStream) => dataAsReadableStream.json())
      .then((dataAsJson) => this.setState({ products: dataAsJson }))
      .catch((err) => console.log(err));
  }

  render() {
    document.title = 'products';

    return (
      <div className="products-list">
        {this.state.products.map((product, index) => {
          return (<ProductCard
            key={index}
            id={product._id}
            imageUrl={product.imageUrl}
            description={product.description}
            price={product.price}
          />);
        })}
      </div>
    )
  }
}

export default ProductsList;
