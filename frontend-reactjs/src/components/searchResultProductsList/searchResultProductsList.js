import React, { useContext } from 'react';

import { SearchResultContext } from '../../contexts/SearchResultContext';
import ProductCard from '../productCard/ProductCard';

function SearchResultProductsList() {
  const { searchResult } = useContext(SearchResultContext);

  return (
    <div>
      {searchResult.length > 0 ? (
        <>
          <h2>search results :</h2>
          {searchResult.map((product, index) => {
            return <ProductCard
              key={index}
              id={product._id}
              imageUrl={product.imageUrl}
              description={product.description}
              price={product.price}
            />
          })}
        </>
      ) : <h2>No products found.</h2>}
    </div>
  );
}

export default SearchResultProductsList;
