import React, { Component } from 'react';
import './App.css';

import ProductsList from './components/product-list/ProductsList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenProductsCategory: ''
    }

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(event) {
    console.log(event.target.name);
    const category = event.target.name;
    this.setState({
      chosenProductsCategory: category,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
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
