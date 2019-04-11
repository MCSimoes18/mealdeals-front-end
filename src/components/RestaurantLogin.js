import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import RestaurantCard from './RestaurantCard'
import { Form, Input, Button } from 'semantic-ui-react'


class RestaurantLogin extends Component {
  state = {
    username: "",
    password: "",
    redirect: false // in order to redirect to restaurant profile
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/restaurants")
      .then(res => res.json())
      .then(res => {
        this.props.dispatch({ type: "ALL_RESTAURANTS", payload: res })
      })
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
  // login = (e) => {
  //   e.preventDefault()
  //   if (this.state.username !== "" || this.state.password !== "") {
  //     this.loginUser(this.state.username, this.state.password)
  //   }
  // }

//find username match. if passwords match dispatch login_user to reducer & update global state for current user. Since user and restaurant login calls the same dispatch - should never be 2 log-ins at a time. Initiates redirect.
  // loginUser = (username, password) => {
  //   console.log("will log in user", username, password);
  //   fetch("http://localhost:3000/api/v1/restaurants")
  //   .then(res => res.json())
  //   .then( json => {
  //   let login_user = json.find( rest => rest.username === username)
  //   if (login_user.password === password) {
  //     console.log("success!")
  //     this.props.dispatch({ type: "LOGIN_USER", payload: login_user })
  //     this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: "restaurant" })
  //     this.setRedirect()
  //   }
  // })
// }

login = (e) => {
  let data = {
    username: this.state.username,
    password: this.state.password
  }
    fetch("http://localhost:3000/api/v1/rest_login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json",
      },
      body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then((response) => {
        if (response.errors) {
          alert(response.errors)
        } else {
            // we need to login at the top level where we are holding our current user!
            // setState in App to currentuser
            let login_user = response.restaurant
            this.props.dispatch({ type: "LOGIN_USER", payload: login_user })
            this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: "restaurant" })
            localStorage.setItem('jwt', response.jwt)
            this.props.history.push(`/RestaurantHome`)
            console.log("success!")
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
      <Form onSubmit={this.login}>
      <Form.Field className="inputText" control={Input} label='Username'
        placeholder='username' onChange={this.handleChange} type="text" name="username" value={this.state.username}
      />
      <Form.Field className="inputText" control={Input} label='Password'
        placeholder='password' onChange={this.handleChange} type="password" name="password" value={this.state.password}
      />
      <br />
        <Form.Field control={Button} content='Login'type="submit" />
          <br />
        Dont have an account? <NavLink to="/RestaurantSignUp"> Register with us here </NavLink>
          <br />
      </Form>
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
        <h1> Restaurant Login </h1>
        {this.renderLoginForm()}
        {this.renderRedirect()}
      </div>
    )
  }

}

export default connect()(RestaurantLogin)
