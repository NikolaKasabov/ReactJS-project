import React, { useContext, useState } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';
import fetchData from '../../utils/fetchData';
import './styles.css';

import errorHandling from '../../utils/errorHandling';

const LoginForm = (props) => {
  const { changeMessage } = useContext(MessagesContext);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  document.title = 'login';

  // on user typing
  const onInputChange = (ev) => {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;

    setUserData({
      ...userData,
      [inputName]: inputValue,
    });
  }

  // login form submit
  const onFormSubmit = (ev) => {
    ev.preventDefault();
    changeMessage('loading...');

    fetchData({
      url: 'http://localhost:5000/login',
      method: 'POST',
      withCredentials: true,  // to save the cookies to the browser
      data: {
        username: userData.username,
        password: userData.password,
      }
    }).then((response) => {
      changeMessage('login successful');
      // redirect to home page
      props.history.push('/');
    }).catch((err) => errorHandling(err, changeMessage, true, 2000));
  }


  return (
    <form className="login-form" onSubmit={onFormSubmit} >
      <input type="text" required id="login-username" name="username" placeholder="username" onChange={onInputChange} value={userData.username} />
      <input type="password" required id="login-password" name="password" placeholder="password" onChange={onInputChange} value={userData.password} />
      <input type="submit" value="LOGIN" />
      <p>Not registered? <a href="/register">Create an account</a></p>
    </form>
  )
}

export default LoginForm;
