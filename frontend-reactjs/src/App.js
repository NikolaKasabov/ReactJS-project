import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Cookies from 'js-cookie';

import Navigation from './components/navigation/Navigation';
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';
import ProductsList from './components/products-list/ProductsList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedUsername: Cookies.get('username'),
    }
  }

  // get logged user's name from the cookies and add it to the state
  addLoggedUsernameToState = () => {
    this.setState({
      loggedUsername: Cookies.get('username'),
    });
  }

  render() {

    // some testing....
    let greeting = '';
    if (this.state.loggedUsername) greeting = <div>Welcome {this.state.loggedUsername}</div>;

    return (
      <div className="App">
        <header className="App-header">
          <Navigation />

          {greeting}
        </header>

        <main>
          {/* using 'render' if must pass props to the component */}
          <Route path='/login' render={(props) => <LoginForm {...props} addUsernameToAppState={this.addLoggedUsernameToState} />} />

          <Route path='/register' component={RegisterForm} />
          <Route path='/products/:category' component={ProductsList} />
        </main>

      </div>
    );
  }
}

export default App;
