import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import RestaurantCard from './RestaurantCard'


export default class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // signupSubmit = (e) => {
  //   e.preventDefault()
  //   let data = {
  //     name: this.state.firstName,
  //     username: this.state.username,
  //     password: this.state.password,
  //     email: this.state.email,
  //     phone: this.state.phone,
  //   }
  //   this.signupUser(data)
  // }

  login = (e) => {
    e.preventDefault()
    if (this.state.username !== "" || this.state.password !== "") {
      this.loginUser(this.state.username, this.state.password)
    }
  }

  loginUser = (username, password) => {
    console.log("will log in user", username, password);
    fetch("http://localhost:3000/api/v1/users")
    .then(res => res.json())
    .then( json => {
    let login_user = json.find( user => user.username === username)
    if (login_user.password === password) {
      console.log("success!")
    }
  })
}

  // signupUser = (data) => {
  //   fetch("http://localhost:3000/api/v1/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accepts": "application/json"
  //     },
  //     body: JSON.stringify(data)
  //   })
  //   .then(res => res.json())
  //   .then(console.log)
  // }

  // renderSignUpForm = () => {
  //   return (
  //     <div className="signup">
  //       <form onSubmit={this.signupSubmit}>
  //         <label> Name: </label>
  //         <input onChange={this.handleChange} type="text" name="firstName" placeholder="Angelica" value={this.state.firstName}/> <br />
  //           <br />
  //         <label> Username: </label>
  //           <br />
  //         <input onChange={this.handleChange} type="text"  name="username" placeholder="AngelicaPickles" value={this.state.username}/>
  //           <br />
  //           <br />
  //         <label>Password: </label>
  //           <br />
  //         <input onChange={this.handleChange} type="password"  name="password" placeholder="8-16 characters" value={this.state.password}/><br />
  //           <br />
  //           <br />
  //           <label>Email: </label>
  //             <br />
  //           <input onChange={this.handleChange} type="email"  name="email" placeholder="angelica.pickles@gmail.com" value={this.state.email}/><br />
  //             <br />
  //             <label>Phone: </label>
  //               <br />
  //             <input onChange={this.handleChange} type="phone"  name="phone" placeholder="(123)-456-7890" value={this.state.phone}/><br />
  //               <br />
  //         <button type="submit">Create Account</button>
  //       </form>
  //     </div>
  //   )
  // }

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
        Dont have an account? <NavLink to="/SignUp"> Sign Up Here </NavLink>
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

showSignUp = () => {
  this.setState({
    showLogin: false
  })
}

// formToDisplay = () => {
//   if (this.state.showLogin == true){
//     return (this.renderLoginForm())
//   }
//   else {
//     return (this.renderSignUpForm())
//   }
// }

render () {
  return (
    <div>
      {this.renderLoginForm()}
    </div>
  )
}

}
