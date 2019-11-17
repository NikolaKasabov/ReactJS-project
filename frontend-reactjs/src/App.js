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
import NotFound from './components/404/404';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Route component={Navigation} />
        </header>

        <main>
          <Message />

          <Switch>
            <Route exact path='/' component={Home} />
            {/* using 'render' if must pass props to the component */}
            {/* <Route exact path='/login' render={(props) => <LoginForm {...props} addUsernameToAppState={this.addLoggedUsernameToState} />} /> */}
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/register' component={RegisterForm} />
            <Route exact path='/products/:category' component={ProductsList} />
            <Route exact path='/shoppingCart' component={ShoppingCart} />
            <Route component={NotFound} />
          </Switch>
        </main>

      </div>
    );
  }
}

export default App;
