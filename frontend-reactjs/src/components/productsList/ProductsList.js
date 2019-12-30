import React, { Component } from 'react';
import ProductCard from '../productCard/ProductCard';
import fetchData from '../../utils/fetchData';
import './styles.css';

class ProductsList extends Component {
  constructor(props) {
    super(props);
    document.title = 'products';

    this.state = {
      products: [],
      isFetching: false,
      err: null
    };
  }

  componentDidMount() {
    const { category } = this.props.match.params;

    this.setState({ isFetching: true, err: null });
    fetchData(`http://localhost:5000/products/${category}`)
      .then((result) => this.setState({ products: result.data, isFetching: false }))
      .catch((err) => this.setState({ isFetching: false, err }));
  }

  // update state on prop changes
  componentDidUpdate(prevProps) {
    const { category } = this.props.match.params;
    const prevCategory = prevProps.match.params.category;

    if (category !== prevCategory) {
      this.setState({ isFetching: true, err: null });
      
      fetchData(`http://localhost:5000/products/${category}`)
        .then((result) => this.setState({ products: result.data, isFetching: false }))
        .catch((err) => this.setState({ isFetching: false, err }));
    }
  }

  // old code: used before fetchData utility was implemented
  // // get selected category products from the express server and add them to state
  // fetchProductsAndAddToState = (category) => {
  //   fetch(`http://localhost:5000/products/${category}`, {
  //     // method: "GET",
  //     // headers: {
  //     //   'Accept': 'application/json',
  //     //   'Content-Type': 'application/json',
  //     //   'Cache': 'no-cache'
  //     // },
  //     credentials: 'include', // without this react will NOT send the cookies with the request to the server
  //   }).then((dataAsReadableStream) => dataAsReadableStream.json())
  //     .then((dataAsJson) => this.setState({ products: dataAsJson }))
  //     .catch((err) => console.log(err));
  // }

  render() {
    if (this.state.isFetching) {
      return <h1>loading...</h1>
    }

    if (this.state.err) {
      return <h1>{this.state.err.message}</h1>
    }

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
