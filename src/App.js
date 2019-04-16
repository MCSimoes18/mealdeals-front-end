import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
/////// IMPORT COMPONENTS ////////
// import $ from "jquery";
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Import Components //
import CouponCard from './components/CouponCard';
import Home from './components/Home';
import Login from './components/Login';
import MonthlyOffers from './components/MonthlyOffers';
import NavBar from './components/NavBar';
import OfferCard from './components/OfferCard';
import RestaurantCard from './components/RestaurantCard';
import RestaurantHome from './components/RestaurantHome';
import RestaurantLogin from './components/RestaurantLogin';
import RestaurantSignUp from './components/RestaurantSignUp';
import Search from './components/Search';
import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';
import GoogleMap from './components/GoogleMap';
import SearchWithMap from './components/SearchWithMap';

class App extends React.Component {

  componentDidMount() {
    console.log('mounting app...')
    fetch("http://localhost:3000/api/v1/offers")
    .then(res=>res.json())
    .then(res => {
      this.props.dispatch({ type: "ALL_OFFERS", payload: res })
    })
    fetch("http://localhost:3000/api/v1/restaurants")
    .then(res => res.json())
    .then(res => {
      this.props.dispatch({ type: "ALL_RESTAURANTS", payload: res })
    })
    fetch("http://localhost:3000/api/v1/users")
    .then(res => res.json())
    .then(res => {
      this.props.dispatch({ type: "ALL_USERS", payload: res })
    })
    fetch("http://localhost:3000/api/v1/coupon_users")
    .then(res => res.json())
    .then(res => {
      this.props.dispatch({ type: "ALL_COUPONS", payload: res })
    })

    const jwtUser = localStorage.getItem('jwtUser')
    const jwtRest = localStorage.getItem('jwtRest')
    if (jwtUser) {
      fetch("http://localhost:3000/api/v1/auto_login", {
        headers: {
          "Authorization": jwtUser
        }
      })
      .then(res => res.json())
      .then((response) => {
        if (response.errors) {
          alert(response.errors)
        } else {
          this.props.dispatch({ type: "LOGIN_USER", payload: response })
          this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: "user" })
        }
      })
    } else if (jwtRest) {
      fetch("http://localhost:3000/api/v1/rest_auto_login", {
        headers: {
          "Authorization": jwtRest
        }
      })
      .then(res => res.json())
      .then((response) => {
        if (response.errors) {
          alert(response.errors)
        } else {
          this.props.dispatch({ type: "LOGIN_USER", payload: response })
          this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: "restaurant" })
          }
        })
      }
    }

    // this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: "user" })

    // we need to set the current user and the token
    setCurrentUser = (response) => {
    localStorage.setItem("token", response.jwt)
      this.setState({
        current_user: response
      })
    }

    // this is just so all of our data is as up to date as possible now that we are
    // just keep state at the top level of our application in order to correctly update
    // we must have the state be updated properly
    // updateUser = (user) => {
    //   this.setState({
    //     current_user: user
    //   })
    // }

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
      <Router>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/monthlyoffers" component={MonthlyOffers} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/restaurantsignup" component={RestaurantSignUp} />
        <Route exact path="/restaurantlogin" component={RestaurantLogin} />
        <Route exact path="/restauranthome" component={RestaurantHome} />
        <Route path="/userprofile" render={()=><UserProfile reLogin={this.reLogin}/>}/>
        <Route exact path="/search" component={Search} />
        <Route exact path="/GoogleMap" component={GoogleMap} />
        <Route exact path="/SearchWithMap" component={SearchWithMap} />
      </Router>
    );
  }
}

export default connect(mapStateToProps)(App)



function mapStateToProps(state) {
  console.log(state)
  return {
    current_user: state.current_user,
    user_type: state.user_type,
    allRestaurants: state.allRestaurants,
    allOffers: state.allOffers,
    allCoupons: state.allCoupons,
    allUsers: state.allUsers
  }
}
