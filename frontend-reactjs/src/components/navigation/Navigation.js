import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
        <NavLink exact to='/' activeClassName="activeNav">Home</NavLink>
        <NavLink to='/products/tv' activeClassName="activeNav">TV</NavLink>
        <NavLink to='/products/laptop' activeClassName="activeNav">Laptops</NavLink>
        <NavLink to='/products/phone' activeClassName="activeNav">Phones</NavLink>
        <NavLink to='/login' activeClassName="activeNav">Login</NavLink>
        <NavLink to='/register' activeClassName="activeNav">Register</NavLink>
        <button onClick={() => alert('logout')}>Logout</button>
      </div>
    )
  }
}

export default Navigation;
