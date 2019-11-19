import React, { createContext, useState } from 'react';

export const SearchResultContext = createContext();

const SearchResultContextProvider = (props) => {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <SearchResultContext.Provider value={{ searchResult, setSearchResult }}>
      {props.children}
    </SearchResultContext.Provider>
  )
}

export default SearchResultContextProvider;
