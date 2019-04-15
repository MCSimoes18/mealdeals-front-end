import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import RestaurantCard from './RestaurantCard'
import UserProfile from './UserProfile'
import { Form, Input, Button } from 'semantic-ui-react'


class Login extends Component {
  state = {
    username: "",
    password: "",
    redirect: false // in order to redirect to user profile
  }

  componentDidMount = () => {
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

    //listening in render() for changed state
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/UserProfile' />
        }
      }

  // login = (e) => {
  //   e.preventDefault()
  //   if (this.state.username !== "" || this.state.password !== "") {
  //     this.loginUser(this.state.username, this.state.password)
  //   }
  // }
  //
  // loginUser = (username, password) => {
  //   console.log("will log in user", username, password);
  //   fetch("http://localhost:3000/api/v1/users")
  //   .then(res => res.json())
  //   .then( json => {
  //   let login_user = json.find( user => user.username === username)
  //     if (login_user.password === password) {
  //       console.log("success!")
  //       this.props.dispatch({ type: "LOGIN_USER", payload: login_user })
  //       this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: "user" })
  //       this.setRedirect()
  //     }
  //   })
  // }

login = (e) => {
  let data = {
    username: this.state.username,
    password: this.state.password
  }
    fetch("http://localhost:3000/api/v1/login", {
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
            if (response.user) {
              console.log("true")
            }
            else {
                console.log("true")
              }
            this.props.dispatch({ type: "LOGIN_USER", payload: response.user })
            this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: "user" })
            localStorage.setItem('jwt', response.jwt)
            this.props.history.push(`/UserProfile`)
          }
        })
  }

  renderLoginForm = () => {
  return (
    <div className="login">
      <Form onSubmit={this.login}>
        <Form.Field className="inputText" control={Input} label='Username'
          placeholder='username' onChange={this.handleChange} type="text" name="username" value={this.state.username}
        />
        <br />
        <Form.Field className="inputText" control={Input} label='Password' placeholder='password' onChange={this.handleChange} type="password"    name="password" value={this.state.password}
        />
        <br />
        <Form.Field control={Button} content='Login'type="submit" />

        </Form>
          <br />
          <br />
        Dont have an account? <NavLink to="/SignUp"> Sign Up Here </NavLink>
          <br />
        ATTN: RESTAURANTS! Interested in working with us?
        <NavLink to="/RestaurantSignUp"> Register with us here </NavLink>
        <NavLink to="/RestaurantLogin"> Restaurant Login</NavLink>


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
export default connect()(Login)

function mapStateToProps(state) {
  return {
    current_user: state.current_user,
    user_type: state.user_type,
    allRestaurants: state.allRestaurants,
    allOffers: state.allOffers,
    allCoupons: state.allCoupons
  }
}
