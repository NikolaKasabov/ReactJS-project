import React, { useContext, useState } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';
import './styles.css';

const RegisterForm = (props) => {
  const { changeMessage } = useContext(MessagesContext);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    repeatPassword: '',
  });

  document.title = 'Register';

  // change input fields background color: red/green
  let classNameUsername = 'regiter-username';
  let classNamePassword = 'regiter-password';
  let classNameRepeatPassword = 'regiter-repeat-password';
  if (userData.username.length < 5) classNameUsername += ' warning';
  if (userData.password.length < 5) classNamePassword += ' warning';
  if (userData.repeatPassword !== userData.password || userData.repeatPassword.length < 5) classNameRepeatPassword += ' warning';

  // on user typing
  const onInputChange = (ev) => {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;

    setUserData({
      ...userData,
      [inputName]: inputValue,
    });
  }

  // on 'Register' button click
  const onFormSubmit = (ev) => {
    ev.preventDefault();
    changeMessage('Loading...');

    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
        repeatPassword: userData.repeatPassword,
      }),
    }).then((result) => {
      if (result.status === 200) {
        changeMessage('Registration successful.');

        // redirect to login page
        props.history.push('/login');
      } else {
        // if there is an error, show the message
        result.json().then((json) => changeMessage(json.error));
      }
    }).catch((err) => changeMessage('Sorry. Something went wrong :('));
  }


  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="register-username">Username: </label>
      <input type="text" id="register-username" name="username" className={classNameUsername} placeholder="min 5 chars..." onChange={onInputChange} />
      <br />
      <label htmlFor="register-password">Password: </label>
      <input type="password" id="register-password" name="password" className={classNamePassword} placeholder="min 5 chars..." onChange={onInputChange} />
      <br />
      <label htmlFor="register-repeat-password">Repeat password: </label>
      <input type="password" id="register-repeat-password" name="repeatPassword" className={classNameRepeatPassword} placeholder="same as password..." onChange={onInputChange} />
      <br />
      <input type="submit" value="Register" />
    </form>
  )
}

export default RegisterForm;
