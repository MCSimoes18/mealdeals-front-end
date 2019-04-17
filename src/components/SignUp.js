import React, { Component, Fragment } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import UserProfile from './UserProfile'
import { connect } from 'react-redux';


class SignUp extends Component {

  state = {
    firstName: "",
    username: "",
    password: "",
    email: "",
    password: "",
    showLogin: true,
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
      // we need to login at the top level where we are holding our current user!
      // setState in App to currentuser
      .then(response => {
      this.props.dispatch({ type: "LOGIN_USER", payload: response })
      this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: "user" })
      localStorage.setItem('jwt', response.jwt)
      console.log("success!")
      })
      .then(() => this.props.history.push(`/UserProfile`))
  }


  renderSignUpForm = () => {
    return (
      <div className="signup">
        <Form onSubmit={this.signupSubmit}>
          <Form.Field className="firstName" control={Input} label="First Name" onChange={this.handleChange} type="text" name="firstName" required={true} placeholder="Angelica" value={this.state.firstName}/> <br />
          <Form.Field required={true} className="userName" control={Input} label="Username:" onChange={this.handleChange} type="text"  required={true} name="username" placeholder="AngelicaPickles" value={this.state.username}/> <br />
          <Form.Field className="password" control={Input} label="Password:"onChange={this.handleChange} type="password"  name="password" required={true} placeholder="8-16 characters" value={this.state.password}/> <br />
          <Form.Field required={true} className="email" control={Input} label= "Email:" onChange={this.handleChange} type="email"  name="email" placeholder="angelica.pickles@gmail.com" value={this.state.email}/><br />
          <Form.Field required={true} className="phone" control={Input} label="Phone"onChange={this.handleChange} name="phone" placeholder="1234567890" type='number' maxLength="2" value={this.state.phone}/><br />
          <Form.Field className="signUpBtn" control={Button} content="Sign Up" type="submit"/>
        </Form>
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

export default connect()(SignUp)

function mapStateToProps(state) {
  return {
    current_user: state.current_user,
    user_type: state.user_type,
    allRestaurants: state.allRestaurants,
    allOffers: state.allOffers,
    allCoupons: state.allCoupons
  }
}
