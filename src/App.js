import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
/////// IMPORT COMPONENTS ////////
import NavBar from './components/NavBar';
// import $ from "jquery";
import './App.css';
import { connect } from 'react-redux';

class App extends React.Component {
  state = {
    restaurants: [],
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/restaurants')
    .then(res=>res.json())
    .then(res => {
      this.props.dispatch({ type: "ALL_RESTAURANTS", payload: res })
    })

    const jwt = localStorage.getItem('jwt')

    if (jwt){
      fetch("http://localhost:3000/api/v1/auto_login", {
        headers: {
          "Authorization": jwt
        }
      })
        .then(res => res.json())
        .then((response) => {
          if (response.errors) {
            alert(response.errors)
          } else {
            this.props.dispatch({ type: "LOGIN_USER", payload: response.user })
            this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: "user" })
          }
        })
      }
    }

    // we need to set the current user and the token
    setCurrentUser = (response) => {
    localStorage.setItem("token", response.jwt)
      this.setState({
        currentUser: response
      })
    }

    // this is just so all of our data is as up to date as possible now that we are
    // just keep state at the top level of our application in order to correctly update
    // we must have the state be updated properly
    updateUser = (user) => {
      this.setState({
        currentUser: user
      })
    }

  // // we need to reset state and remove the current user and remove the token
  // logout = () => {
  //   localStorage.removeItem("token")
  //   this.props.dispatch({ type: "LOGIN_USER", payload: null })
  //   this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: null })
  //   this.setState({
  //     currentUser: null
  //   }, () => { this.props.history.push("/login") })
  // }

render () {
    return (
      <div>
        <NavBar restaurants={this.state.restaurants} logout={this.logout}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App)



function mapStateToProps(state) {
  return {
    current_user: state.current_user,
    user_type: state.user_type
  }
}
