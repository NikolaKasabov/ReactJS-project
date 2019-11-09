import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false,
    }
  }

  render() {
    return (
      <div className='navigation-container'>
        <Link to='/'>Home</Link>
        <Link to='/products/tv'>TV</Link>
        <Link to='/products/laptop'>Laptops</Link>
        <Link to='/products/phone'>Phones</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>
    )
  }
}

export default Navigation;
