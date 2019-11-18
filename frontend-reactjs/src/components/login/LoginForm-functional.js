import React, { useContext, useState } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';

const LoginForm = (props) => {
  const { changeMessage } = useContext(MessagesContext);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });


  // when user is typing
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

    // send POST request to the express server with the login data, and get a cookie with jwt
    fetch('http://localhost:5000/login', {
      method: 'POST',
      withCredentials: true,   // to save the cookie to the browser
      credentials: 'include',  // to save the cookie to the browser
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
      }),
    }).then((result) => {
      if (result.status === 200) {
        changeMessage('Login successful');
        // redirect to home page
        props.history.push('/');
      } else {
        // if there is an error, show the message
        result.json().then((json) => changeMessage(json.error));
      }
    }).catch(() => changeMessage('Sorry. Something went wrong.'));
  }


  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="login-username">Username: </label>
      <input type="text" id="login-username" name="username" onChange={onInputChange} value={userData.username} />
      <br />
      <label htmlFor="login-password">Password: </label>
      <input type="password" id="login-password" name="password" onChange={onInputChange} value={userData.password} />
      <br />
      <input type="submit" value="Login" />
    </form>
  )
}

export default LoginForm;
