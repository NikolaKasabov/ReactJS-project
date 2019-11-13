import React, { Component, useContext } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Cookies from 'js-cookie';

import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';
import ProductsList from './components/products-list/ProductsList';

import UsernameContextProvider from './contexts/UsernameContext';
import { UsernameContext } from './contexts/UsernameContext';


const App = () => {
  const { username, changeUsername } = useContext(UsernameContext);

  changeUsername(Cookies.get('username'));
  
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>

      <main>
        <Route exact path='/' component={Home} />

        {/* using 'render' if must pass props to the component */}
        {/* <Route exact path='/login' render={(props) => <LoginForm {...props} addUsernameToAppState={this.addLoggedUsernameToState} />} /> */}

        <Route exact path='/register' component={RegisterForm} />
        <Route exact path='/products/:category' component={ProductsList} />
      </main>

    </div>
  )
}



class Appqqqq extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedUsername: Cookies.get('username'),
    }
  }

  // // get logged user's name from the cookies and add it to the state
  // addLoggedUsernameToState = () => {
  //   this.setState({
  //     loggedUsername: Cookies.get('username'),
  //   });
  // }

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
          <Route exact path='/' component={Home} />

          {/* using 'render' if must pass props to the component */}
          <Route exact path='/login' render={(props) => <LoginForm {...props} addUsernameToAppState={this.addLoggedUsernameToState} />} />

          <Route exact path='/register' component={RegisterForm} />
          <Route exact path='/products/:category' component={ProductsList} />
        </main>

      </div>
    );
  }
}

export default App;