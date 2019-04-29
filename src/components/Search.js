import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Redux //
import { connect } from 'react-redux';
// Import Components //
import NavBar from './NavBar';
import RestaurantCard from './RestaurantCard';
import { Card, Button, Input, Container} from 'semantic-ui-react'

class Home extends React.Component {

  state = {
    loc: "", // dispatches users search input
    food: "" // dispatches users search input
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "SEARCH_LOC", payload: this.state.loc })
    this.props.dispatch({ type: "SEARCH_CUISINE", payload: this.state.food })
    this.handleSearch(this.state.food, this.state.loc)
  }

  handleSearch = (cuisine, location) => {
   const data = {cuisine: cuisine, location: location };
   return fetch("http://localhost:3000/api/v1/search", {
       method: "POST",
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
   .then(res => res.json())
   .then(results => this.props.dispatch({ type: "SEARCH_RESULTS", payload: results }))
  }


  renderSearchCards = () => {
    if (this.props.rests === null) {
      return null
    } else if (this.props.rests === undefined) {
      return null
    } else {
      return this.props.rests.businesses.map(rest => {
        return (
        <RestaurantCard
        restaurant={rest}
        viewOnMap={this.props.viewOnMap}
        />
        )
      })
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1 className="MealSteals"> MEAL
        <img className="headerMarker" src={process.env.PUBLIC_URL + '/foodMarker.png'}/> DEALS
        </h1>
        <div className="searchBar">
          <form onSubmit={this.handleSubmit}>
            <Input type="text" name="food" onChange={this.handleChange} placeholder="cuisine.."/>
            <Input type="text" name="loc" onChange={this.handleChange} placeholder="location.." action={{ icon: 'search' }}/>
          </form>
          <h3> displaying results For {this.props.cuisine} food, in {this.props.location}... </h3>
          </div>
        <Card.Group >
          {this.renderSearchCards()}
        </Card.Group>
      </div>
    );
  };
}

export default connect(mapStateToProps)(Home);



function mapStateToProps(state) {
  return {
    keyword: state.keyword,
    current_user: state.current_user,
    rests: state.rests,
    cuisine: state.cuisine,
    location: state.location,

    user_type: state.user_type,
    allRestaurants: state.allRestaurants,
    allOffers: state.allOffers,
    allCoupons: state.allCoupons


  }

  console.log("here", state.keyword)
}
