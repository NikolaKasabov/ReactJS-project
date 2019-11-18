import React, { useState } from 'react';

function Search(props) {
  const [searchString, setSearchString] = useState('');

  function onInputChange(ev){
    setSearchString(ev.target.value);
  }

  function onSubmit(ev) {
    ev.preventDefault();

    props.history.push('/search');
  }

  return (
    <form onSubmit={onSubmit}>
      <input type='text' name='searchString' onChange={onInputChange} />
      <button type='submit'>Search</button>
    </ form>
  )
}

export default Search;
