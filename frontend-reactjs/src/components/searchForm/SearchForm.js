// import React, { useContext, useState } from 'react';
import React, { useContext } from 'react';
import { SearchResultContext } from '../../contexts/SearchResultContext';

function SearchForm(props) {
  // const [searchString, setSearchString] = useState('');
  const { setSearchResult } = useContext(SearchResultContext);

  // on user typing
  function onInputChange(ev) {
    // setSearchString(ev.target.value);  // It's asynchronous. Used when Submit button is present.

    // fetch searched products and send them to SearchResultContext
    fetch('http://localhost:5000/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // 'searchString': searchString,
        'searchString': ev.target.value,
      }),
    }).then((result) => result.json())
      .then((products) => setSearchResult(products))
      .catch((err) => console.log(err));

    // redirect to '/search', if not there already
    if (props.location.pathname !== '/search') props.history.push('/search');
  }

  // // on 'Search' button click
  // function onSubmit(ev) {
  //   ev.preventDefault();

  //   // if search field is empty don't do anything
  //   if (searchString.length === 0) {
  //     return;
  //   }

  //   // fetch searched products and add them to SearchResultContext
  //   fetch('http://localhost:5000/search', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       'searchString': searchString,
  //     }),
  //   }).then((result) => result.json())
  //     .then((products) => setSearchResult(products))
  //     .catch((err) => console.log(err));

  //   // redirect to '/search' path
  //   props.history.push('/search');
  // }

  return (
    // <form onSubmit={onSubmit}>
    <form>
      <input
        type='text'
        placeholder='Search...'
        onChange={onInputChange}
        onBlur={(ev) => ev.target.value = ''}
      />
      {/* <button type='submit'>Search</button> */}
    </ form>
  )
}

export default SearchForm;
