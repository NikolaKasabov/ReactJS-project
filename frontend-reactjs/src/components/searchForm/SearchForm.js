import React, { useContext } from 'react';
import { SearchResultContext } from '../../contexts/SearchResultContext';
import { MessagesContext } from '../../contexts/MessagesContext';
import fetchData from '../../utils/fetchData';
import './styles.css';

function SearchForm(props) {
  const { setSearchResult } = useContext(SearchResultContext);
  const { changeMessage } = useContext(MessagesContext);

  // on user typing
  function onInputChange(ev) {
    // if search field is empty return no products
    if (ev.target.value === '') {
      return setSearchResult([]);
    }

    // redirect to '/search', if not there already
    if (props.location.pathname !== '/search') props.history.push('/search');

    // old code: used before fetchData utility was implemented
    // fetch searched products and send them to SearchResultContext
    // fetch('http://localhost:5000/search', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     'searchString': ev.target.value,
    //   }),
    // }).then((result) => result.json())
    //   .then((products) => setSearchResult(products))
    //   .catch((err) => console.log(err));

    fetchData({
      url: 'http://localhost:5000/search',
      method: 'POST',
      data: {
        'searchString': ev.target.value,
      },
    }).then((result) => setSearchResult(result.data))
      .catch((err) => changeMessage(err.message, true, 3000));
  }

  return (
    <input
      className="search-input"
      type="text"
      placeholder="search products..."
      onChange={onInputChange}
      onBlur={(ev) => ev.target.value = ''}
    />
  );
}

export default SearchForm;
