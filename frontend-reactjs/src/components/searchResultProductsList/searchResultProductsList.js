import React, { useContext } from 'react';

import { SearchResultContext } from '../../contexts/SearchResultContext';
import ProductCard from '../productCard/ProductCard';
import './styles.css';

function SearchResultProductsList() {
  const { searchResult } = useContext(SearchResultContext);

  document.title = 'search results';

  return (
    <div>
      {searchResult.length > 0 ? (
        <>
          {/* <h2 className="search-result-title">search results:</h2> */}
          <div className="products-list">
            {searchResult.map((product, index) => {
              return <ProductCard
                key={index}
                id={product._id}
                imageUrl={product.imageUrl}
                description={product.description}
                price={product.price}
              />
            })}
          </div>
        </>
      ) : <h1 className="search-result-title">no products found</h1>}
    </div>
  );
}

export default SearchResultProductsList;
