import React, { useContext } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import './styles.css';

import { MessagesContext } from '../../contexts/MessagesContext';
import SearchForm from '../searchForm/SearchForm';

function Navigation(props) {
  const { changeMessage } = useContext(MessagesContext);
  const username = Cookies.get('username');
  // check if user is logged in, i.e. there is 'jwt' cookie
  const isLoggedIn = Cookies.get('jwt');
  // check if logged user is Admin
  const isAdmin = Cookies.get('username') === 'admin';

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
      <NavLink exact to='/' activeClassName='activeNav'>e-comm</NavLink>

      <div className="navigation-products-links">
        <NavLink to='/products/tv' activeClassName='activeNav'>tv sets</NavLink>
        <NavLink to='/products/laptop' activeClassName='activeNav'>laptops</NavLink>
        <NavLink to='/products/phone' activeClassName='activeNav'>phones</NavLink>
      </div>
      
      {/* SearchForm is in Route component so we can use redirect inside it (with props.history.push('/somePath')) */}
      <Route component={SearchForm} />

      <div className="navigation-auth-links">
        {!isLoggedIn ? (
          <>
            <NavLink to='/login' activeClassName='activeNav'>login</NavLink>
            <NavLink to='/register' activeClassName='activeNav'>register</NavLink>
          </>
        ) : (
            <>
              <NavLink to='/shoppingCart' activeClassName='activeNav'>{username}'s cart</NavLink>
              {isAdmin && <NavLink to='/addNewProduct' activeClassName='activeNav'>add product</NavLink>}
              <button onClick={onLogoutClick}>logout</button>
            </>
          )}
      </div>

    </div>
  )
}

export default Navigation;
