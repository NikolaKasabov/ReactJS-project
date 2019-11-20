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

  const onInputChange = (ev) => {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;

    setUserData({
      ...userData,
      [inputName]: inputValue,
    });
  }

  const onFormSubmit = (ev) => {
    ev.preventDefault();

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

        // redirect to home page
        props.history.push('/login');
      } else {
        // if there is an error, show the message
        result.json().then((json) => changeMessage(json.error));
      }
    }).catch((err) => changeMessage('500. Something went wrong :('));
  }


  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="register-username">Username: </label>
      <input type="text" id="register-username" name="username" className={classNameUsername} onChange={onInputChange} />
      <br />
      <label htmlFor="register-password">Password: </label>
      <input type="password" id="register-password" name="password" className={classNamePassword} onChange={onInputChange} />
      <br />
      <label htmlFor="register-repeat-password">Repeat password: </label>
      <input type="password" id="register-repeat-password" name="repeatPassword" className={classNameRepeatPassword} onChange={onInputChange} />
      <br />
      <input type="submit" value="Register" />
    </form>
  )
}








// class RegisterForm extends Component {
//   constructor(props) {
//     super(props);
//     this.onInputChange = this.onInputChange.bind(this);
//     this.onFormSubmit = this.onFormSubmit.bind(this);

//     this.state = {
//       username: '',
//       password: '',
//     }
//   }

//   onInputChange(event) {
//     const inputName = event.target.name;
//     const inputValue = event.target.value;

//     this.setState({ [inputName]: inputValue });
//   }

//   onFormSubmit(event) {
//     event.preventDefault();

//     fetch('http://localhost:5000/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         username: this.state.username,
//         password: this.state.password,
//       }),
//     })
//   }

//   render() {
//     return (
//       <form onSubmit={this.onFormSubmit}>
//         <label htmlFor="register-username">Username: </label>
//         <input type="text" id="register-username" name="username" onChange={this.onInputChange} />
//         <br />
//         <label htmlFor="register-password">Password: </label>
//         <input type="password" id="register-password" name="password" onChange={this.onInputChange} />
//         <br />
//         <input type="submit" value="Register" />
//       </form>
//     )
//   }
// }

export default RegisterForm;
