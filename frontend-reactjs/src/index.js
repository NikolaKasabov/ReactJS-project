import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
// import App from './App-functional';
import * as serviceWorker from './serviceWorker';

import MessagesContextProvider from './contexts/MessagesContext';
import SearchResultContextProvider from './contexts/SearchResultContext';


ReactDOM.render((
  <BrowserRouter>
    <MessagesContextProvider>
      <SearchResultContextProvider>
        <App />
      </SearchResultContextProvider>
    </MessagesContextProvider>
  </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
