import React, { Component } from 'react';
import ProductCard from '../productCard/ProductCard';
import PageNumberButtons from '../pageNumberButtons/PageNumberButtons';
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
      PRODUCTS_PER_PAGE: 1,
      isFetching: false,
      err: null,
    };
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    this.getNumberOfPagesAndAddToState(category);
    this.fetchProductsAndAddToState(category);
  }

  // update state on prop changes(on product category change)
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
    const pageNumber = Number(ev.target.innerHTML);

    this.setState({ currentPageNumber: pageNumber });
    this.fetchProductsAndAddToState(category, pageNumber);
  }

  // get how many pages there are for product category
  getNumberOfPagesAndAddToState = (category) => {

    fetchData(`http://localhost:5000/numberOfProducts/${category}`)
      .then((result) => {
        const numberOfProducts = Number(result.data.numberOfProducts);
        const numberOfPages = Math.ceil(numberOfProducts / this.state.PRODUCTS_PER_PAGE);
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
        <PageNumberButtons onPageChange={this.onPageChange} numberOfPages={this.state.numberOfPages} currentPageNumber={this.state.currentPageNumber} numberOfNeighbourPages={2} />

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
