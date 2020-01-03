import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';
import ProductsList from './components/productsList/ProductsList';
import Message from './components/message/Message';
import ShoppingCart from './components/shoppingCart/shoppingCart';
import SearchResultProductsList from './components/searchResultProductsList/searchResultProductsList';
import AdminForm from './components/adminForm/AdminForm';
import NotFound from './components/404/404';


function App(props) {
  const url = props.location.pathname;
  let appMainClass = 'App-main';

  if (url === '/products/tv') { appMainClass += ' products-tv'; }
  else if (url === '/products/laptop') { appMainClass += ' products-laptop'; }
  else if (url === '/products/phone') { appMainClass += ' products-phone'; }
  else { appMainClass += ' home'; }

  return (
    <div className="App">
      <header className="App-header">
        <Route component={Navigation} />
      </header>

      <main className={appMainClass}>
        <Route component={Message} />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/products/:category' component={ProductsList} />
          <Route path='/shoppingCart' component={ShoppingCart} />
          <Route path='/search' component={SearchResultProductsList} />
          <Route path='/addNewProduct' component={AdminForm} />
          <Route component={NotFound} />
        </Switch>
      </main>

      <footer className="App-footer">
        <p>Copyright &copy; 2019 <strong>e-comm</strong>. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
