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
    let links;

    return (
      <div className='navigation-container'>
        <Link to='/products/tv'>Телевизори</Link>
        <Link to='/products/laptop'>Лаптопи</Link>
        <Link to='/products/phone'>Телефони</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>
    )
  }
}

export default Navigation;
