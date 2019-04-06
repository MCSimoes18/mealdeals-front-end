import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import RestaurantCard from './RestaurantCard'


class RestaurantLogin extends Component {
  state = {
    username: "",
    password: "",
    redirect: false // in order to redirect to restaurant profile
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

// use state to know when to re-direct to restaurant homepage
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

//if fields are not empty - call loginUser
  login = (e) => {
    e.preventDefault()
    if (this.state.username !== "" || this.state.password !== "") {
      this.loginUser(this.state.username, this.state.password)
    }
  }

//find username match. if passwords match dispatch login_user to reducer & update global state for current user. Since user and restaurant login calls the same dispatch - should never be 2 log-ins at a time. Initiates redirect.
  loginUser = (username, password) => {
    console.log("will log in user", username, password);
    fetch("http://localhost:3000/api/v1/restaurants")
    .then(res => res.json())
    .then( json => {
    let login_user = json.find( rest => rest.username === username)
    if (login_user.password === password) {
      console.log("success!")
      this.props.dispatch({ type: "LOGIN_USER", payload: login_user })
      this.setRedirect()
    }
  })
}

//listening in render() for changed state
renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/RestaurantHome' />
    }
  }

//login form
  renderLoginForm = () => {
  return (
    <div className="login">
      <form onSubmit={this.login}>
        <label>Username: </label>
          <br/>
        <input onChange={this.handleChange} type="text"  name="username" value={this.state.username}/><br />
          <br />
        <label>Password: </label>
          <br />
        <input onChange={this.handleChange} type="password"  name="password" value={this.state.password}/><br />
          <br />
          <br />
        <button type="submit">Submit</button>
          <br />
          <br />
        Dont have an account? <NavLink to="/RestaurantSignUp"> Register with us here </NavLink>
          <br />
      </form>
      {
        this.props.errorLogin ?
        <p>Invalid Username or Password</p>
        :
        null
      }
    </div>
  )
}

  render () {
    return (
      <div>
        <h1> Login </h1>
        {this.renderLoginForm()}
        {this.renderRedirect()}
      </div>
    )
  }

}

export default connect()(RestaurantLogin)
