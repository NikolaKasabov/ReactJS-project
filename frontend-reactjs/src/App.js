import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

// import Cookies from 'js-cookie';

import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
// import RegisterForm from './components/register/RegisterForm';
import RegisterForm from './components/register/RegisterForm-functional';
// import LoginForm from './components/login/LoginForm';
import LoginForm from './components/login/LoginForm-functional';
import ProductsList from './components/products-list/ProductsList';
import Message from './components/message/Message';
import ShoppingCart from './components/shoppingCart/shoppingCart';
import SearchResultProductsList from './components/searchResultProductsList/searchResultProductsList';
import AdminForm from './components/admin-form/AdminForm';
import NotFound from './components/404/404';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Route component={Navigation} />
        </header>

        <main>
          <Route component={Message} />

          <Switch>
            <Route exact path='/' component={Home} />
            {/* using 'render' if must pass props to the component */}
            {/* <Route exact path='/login' render={(props) => <LoginForm {...props} addUsernameToAppState={this.addLoggedUsernameToState} />} /> */}
            <Route path='/login' component={LoginForm} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/products/:category' component={ProductsList} />
            <Route path='/shoppingCart' component={ShoppingCart} />
            <Route path='/search' component={SearchResultProductsList} />
            <Route path='/addNewProduct' component={AdminForm} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
