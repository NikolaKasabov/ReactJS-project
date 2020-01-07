import React, { useContext, useState, useEffect } from 'react';
import uuid from 'uuid/v1';
import { SearchResultContext } from '../../contexts/SearchResultContext';
import ProductCard from '../productCard/ProductCard';
import PageNumberButtons from '../pageNumberButtons/PageNumberButtons';
import './styles.css';

function SearchResultProductsList() {
  const { searchResult } = useContext(SearchResultContext);
  const [foundProducts, setFoundProducts] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const PRODUCTS_PER_PAGE = 8;

  document.title = 'search results';

  useEffect(() => {
    setFoundProducts(searchResult);
    setCurrentPageNumber(1);
  }, [searchResult]);

  function onPageChange(ev) {
    const pageNumber = Number(ev.target.innerHTML);
    setCurrentPageNumber(pageNumber);
  }

  return (
    foundProducts.length === 0
      ? <h1 className="search-result-title">no products found</h1>
      : (
        <>
          <PageNumberButtons
            onPageChange={onPageChange}
            numberOfPages={Math.ceil(foundProducts.length / PRODUCTS_PER_PAGE)}
            currentPageNumber={currentPageNumber}
          />

          <div className="products-list">
            {foundProducts.slice((PRODUCTS_PER_PAGE * (currentPageNumber - 1)), (PRODUCTS_PER_PAGE * currentPageNumber)).map((product) => (
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
      )
  );
}

export default SearchResultProductsList;
