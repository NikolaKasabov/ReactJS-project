import React, { useContext, useState } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';
import fetchData from '../../utils/fetchData';
import './styles.css';

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

    // old code: used before fetchData utility was implemented
    // // send POST request to the express server with the login data, and get a cookie with jwt
    // fetch('http://localhost:5000/login', {
    //   method: 'POST',
    //   // withCredentials: true,   // to save the cookies to the browser
    //   credentials: 'include',  // to save the cookies to the browser
    //   headers: {
    //     // 'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: userData.username,
    //     password: userData.password,
    //   }),
    // }).then((result) => {
    //   if (result.status === 200) {
    //     changeMessage('Login successful');
    //     // redirect to home page
    //     props.history.push('/');
    //   } else {
    //     // if there is an error, show the message
    //     result.json().then((json) => changeMessage(json.error));
    //   }
    // }).catch(() => changeMessage('Sorry. Something went wrong :('));


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
    }).catch((err) => {
      // if express server DID NOT respond
      if (!err.response) {
        return changeMessage(err.message);
      }

      // if express server DID respond
      if (err.response) {
        return changeMessage(err.response.data.error);
      }
    });
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
