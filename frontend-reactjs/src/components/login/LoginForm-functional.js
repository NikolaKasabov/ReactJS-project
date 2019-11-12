import React, {useContext, useState } from 'react';
import { UsernameContext } from '../../contexts/UsernameContext';


const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log(useContext(UsernameContext));

  const onInputChange = (ev) => {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;

    if (inputName === 'username') {
      setUsername(inputValue);
    } else {
      setPassword(inputValue);
    }
  }

  // login user
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
        username: username,
        password: password,
      }),
    }).then((result) => {
      if (result.status === 200) {
        // add logged user's name to the App component's state
        props.addUsernameToAppState(username);
      } else {
        result.json().then((json) => alert(json.error));
      }
    }).catch((err) => alert(err));
  }


  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="login-username">Username: </label>
      <input type="text" id="login-username" name="username" onChange={onInputChange} value={username} />
      <br />
      <label htmlFor="login-password">Password: </label>
      <input type="password" id="login-password" name="password" onChange={onInputChange} value={password} />
      <br />
      <input type="submit" value="Login" />
    </form>
  )
}

export default LoginForm;
