import React, { useContext } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import './styles.css';
import { MessagesContext } from '../../contexts/MessagesContext';

import Search from '../search/SearchForm';

function Navigation(props) {
  const { changeMessage } = useContext(MessagesContext);
  const username = Cookies.get('username');
  // check if user is logged in, i.e. there is 'jwt' cookie
  const isLoggedIn = Cookies.get('jwt');

  const onLogoutClick = () => {
    // delete cookies
    Cookies.remove('jwt');
    Cookies.remove('username');

    // redirect to home page
    props.history.push('/');

    // show message
    changeMessage('Logout successful.');
  };

  return (
    <div className='navigation-container'>
      <NavLink exact to='/' activeClassName="activeNav">Home</NavLink>
      <NavLink to='/products/tv' activeClassName="activeNav">TV</NavLink>
      <NavLink to='/products/laptop' activeClassName="activeNav">Laptops</NavLink>
      <NavLink to='/products/phone' activeClassName="activeNav">Phones</NavLink>

      {!isLoggedIn ? (
        <>
          <NavLink to='/login' activeClassName="activeNav">Login</NavLink>
          <NavLink to='/register' activeClassName="activeNav">Register</NavLink>
        </>
      ) : (
          <>
            <NavLink to='/shoppingCart' activeClassName="activeNav">{username}'s cart.</NavLink>
            <button onClick={onLogoutClick}>Logout</button>
          </>
        )}

      <Route component={Search} />
    </div>
  )
}

export default Navigation;
