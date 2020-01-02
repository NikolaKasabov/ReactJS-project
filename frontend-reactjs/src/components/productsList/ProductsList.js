import React, { Component } from 'react';
import ProductCard from '../productCard/ProductCard';
import PageButtons from '../pageButtons/PageButtons';
import fetchData from '../../utils/fetchData';
import uuid from 'uuid/v1';
import './styles.css';

class ProductsList extends Component {
  constructor(props) {
    super(props);
    document.title = 'products';

    this.state = {
      products: [],
      numberOfPages: null,
      currentPageNumber: 1,
      isFetching: false,
      err: null,
    };
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    this.getNumberOfPagesAndAddToState(category);
    this.fetchProductsAndAddToState(category);
  }

  // update state on prop changes
  componentDidUpdate(prevProps) {
    const { category } = this.props.match.params;
    const prevCategory = prevProps.match.params.category;

    if (category !== prevCategory) {
      this.setState({ currentPageNumber: 1 });
      this.getNumberOfPagesAndAddToState(category);
      this.fetchProductsAndAddToState(category);
    }
  }

  fetchProductsAndAddToState = (category, pageNumber = 1) => {
    this.setState({ isFetching: true, err: null });
    fetchData(`http://localhost:5000/products/${category}/${pageNumber}`)
      .then((result) => this.setState({ products: result.data, isFetching: false }))
      .catch((err) => this.setState({ isFetching: false, err }));
  }

  // on page number click
  onPageChange = (ev) => {
    const { category } = this.props.match.params;
    const pageNumber = ev.target.innerHTML;

    this.setState({ currentPageNumber: pageNumber });
    this.fetchProductsAndAddToState(category, pageNumber);
  }

  // get how many pages there are for product category
  getNumberOfPagesAndAddToState = (category) => {
    const productsPerPage = 8;

    fetchData(`http://localhost:5000/numberOfProducts/${category}`)
      .then((result) => {
        const numberOfProducts = Number(result.data.numberOfProducts);
        const numberOfPages = Math.ceil(numberOfProducts / productsPerPage);
        return this.setState({ numberOfPages });
      }).catch((err) => console.log(err));
  }


  render() {
    if (this.state.isFetching) {
      return <h1>loading...</h1>;
    }

    if (this.state.err) {
      return <h1>{this.state.err.message}</h1>;
    }

    return (
      <>
        <PageButtons onPageChange={this.onPageChange} numberOfPages={this.state.numberOfPages} currentPageNumber={this.state.currentPageNumber} />

        <div className="products-list">
          {this.state.products.map((product, index) => (
            <ProductCard
              key={uuid()}
              id={product._id}
              imageUrl={product.imageUrl}
              description={product.description}
              price={product.price}
            />
          ))}
        </div>
      </>
    );
  }
}

export default ProductsList;
