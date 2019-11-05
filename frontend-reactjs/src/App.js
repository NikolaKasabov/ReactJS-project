import React, { Component } from 'react';
import './App.css';

// import { withCookies } from 'react-cookie';

import RegisterForm from './components/register/RegisterForm';
import LoginForm from './components/login/LoginForm';
import ProductsList from './components/product-list/ProductsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.state = {
      chosenProductsCategory: '',
    }
  }

  onButtonClick(event) {
    const category = event.target.name;
    this.setState({
      chosenProductsCategory: category,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <RegisterForm />
          <LoginForm />

          <button onClick={this.onButtonClick} name="tv">Телевизори</button>
          <button onClick={this.onButtonClick} name="laptop">Лаптопи</button>
          <button onClick={this.onButtonClick} name="phone">Телефони</button>
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
