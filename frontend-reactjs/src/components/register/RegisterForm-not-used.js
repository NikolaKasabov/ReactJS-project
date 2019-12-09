import React, { Component } from 'react';

class RegisterForm extends Component {
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

  onFormSubmit(event) {
    event.preventDefault();

    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <label htmlFor="register-username">Username: </label>
        <input type="text" id="register-username" name="username" onChange={this.onInputChange} />
        <br />
        <label htmlFor="register-password">Password: </label>
        <input type="password" id="register-password" name="password" onChange={this.onInputChange} />
        <br />
        <input type="submit" value="Register" />
      </form>
    )
  }
}

export default RegisterForm;
