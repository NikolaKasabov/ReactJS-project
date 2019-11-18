import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
  const [searchString, setSearchString] = useState('');

  
}