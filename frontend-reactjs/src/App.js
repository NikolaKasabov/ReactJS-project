import React, { Component } from 'react';
import './App.css';

// import { withCookies } from 'react-cookie';
import Cookies from 'js-cookie';

import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';
import ProductsList from './components/product-list/ProductsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.changeProductCategory = this.changeProductCategory.bind(this);
    this.addLoggedUsernameToState = this.addLoggedUsernameToState.bind(this);

    this.state = {
      chosenProductsCategory: '',
      loggedUsername: Cookies.get('username'),
    }
  }

  changeProductCategory(event) {
    const category = event.target.name;
    this.setState({
      chosenProductsCategory: category,
    });
  }

  addLoggedUsernameToState() {
    this.setState({
      loggedUsername: Cookies.get('username'),
    });
  }

  render() {

    let greeting = '';
    if (this.state.loggedUsername) greeting = <div>Welcome {this.state.loggedUsername}</div>;

    return (
      <div className="App">
        <header className="App-header">
          <RegisterForm />
          <LoginForm addUsernameToApp={this.addLoggedUsernameToState}/>

          <button onClick={this.changeProductCategory} name="tv">Телевизори</button>
          <button onClick={this.changeProductCategory} name="laptop">Лаптопи</button>
          <button onClick={this.changeProductCategory} name="phone">Телефони</button>

          {greeting}
        </header>

        <main>
          <ProductsList category={this.state.chosenProductsCategory} />
        </main>

      </div>
    );
  }
}

export default App;
// export default withCookies(App);
