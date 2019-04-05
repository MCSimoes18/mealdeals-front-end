import React, { Component, Fragment } from 'react'

export default class SignUp extends Component {

  state = {
    firstName: "",
    username: "",
    password: "",
    email: "",
    password: "",
    showLogin: true,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  signupSubmit = (e) => {
    e.preventDefault()
    let data = {
      name: this.state.firstName,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone,
    }
    this.signupUser(data)
  }

  signupUser = (data) => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(console.log)
  }

  renderSignUpForm = () => {
    return (
      <div className="signup">
        <form onSubmit={this.signupSubmit}>
          <label> Name: </label>
          <input onChange={this.handleChange} type="text" name="firstName" placeholder="Angelica" value={this.state.firstName}/> <br />
            <br />
          <label> Username: </label>
            <br />
          <input onChange={this.handleChange} type="text"  name="username" placeholder="AngelicaPickles" value={this.state.username}/>
            <br />
            <br />
          <label>Password: </label>
            <br />
          <input onChange={this.handleChange} type="password"  name="password" placeholder="8-16 characters" value={this.state.password}/><br />
            <br />
            <br />
          <label>Email: </label>
            <br />
          <input onChange={this.handleChange} type="email"  name="email" placeholder="angelica.pickles@gmail.com" value={this.state.email}/><br />
            <br />
          <label>Phone: </label>
            <br />
          <input onChange={this.handleChange} type="phone"  name="phone" placeholder="(123)-456-7890" value={this.state.phone}/><br />
            <br />
          <button type="submit">Create Account</button>
        </form>
      </div>
    )
  }

  render () {
    return (
      <div>
        <h1> Ready For Exclusive Offers! </h1>
        {this.renderSignUpForm()}
      </div>
    )
  }

}
