import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
    }
  }

  onInputChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    this.setState({ [inputName]: inputValue });
  }

  // login user
  onFormSubmit(event) {
    event.preventDefault();

    // send POST request to express server with the login data, and get a cookie with jwt
    fetch('http://localhost:5000/login', {
      method: 'POST',

      withCredentials: true,   // for cookies to save to the browser
      credentials: 'include',  // for cookies to save to the browser

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((result) => {
        if (result.status === 200) {
          // add logged user name to the App component's state
          this.props.addUsernameToApp();
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <label htmlFor="login-username">Username: </label>
        <input type="text" id="login-username" name="username" onChange={this.onInputChange} value={this.state.username} />
        <br />
        <label htmlFor="login-password">Password: </label>
        <input type="password" id="login-password" name="password" onChange={this.onInputChange} value={this.state.password} />
        <br />
        <input type="submit" value="Login" />
      </form>
    )
  }
}

export default LoginForm;
