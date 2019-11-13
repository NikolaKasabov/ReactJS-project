import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Cookies from 'js-cookie';

import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
// import RegisterForm from './components/register/RegisterForm';
import RegisterForm from './components/register/RegisterForm-functional';
// import LoginForm from './components/login/LoginForm';
import LoginForm from './components/login/LoginForm-functional';
import ProductsList from './components/products-list/ProductsList';
import Message from './components/message/Message';
import NotFound from './components/404/404';

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

          {/* testing */}
          {greeting}
        </header>

        <main>
          <Message />

          <Switch>
            <Route exact path='/' component={Home} />
            {/* using 'render' if must pass props to the component */}
            <Route exact path='/login' render={(props) => <LoginForm {...props} addUsernameToAppState={this.addLoggedUsernameToState} />} />
            <Route exact path='/register' component={RegisterForm} />
            <Route exact path='/products/:category' component={ProductsList} />
            <Route component={NotFound} />
          </Switch>
        </main>

      </div>
    );
  }
}

export default App;
