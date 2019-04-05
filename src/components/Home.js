import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Redux //
import { connect } from 'react-redux';
// Import Components //
import NavBar from './NavBar';
import RestaurantCard from './RestaurantCard';

class Home extends React.Component {

  state = {
    cuisine: "",
    location: "",
    rests: []
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "SEARCH_LOC", payload: this.state.term })
    this.props.dispatch({ type: "SEARCH_CUISINE", payload: this.state.term })
    this.setState({ location: "", cuisine: "" });
    console.log("cuisine", this.state.cuisine)
    console.log("location", this.state.location)
    this.handleSearch(this.state.cuisine, this.state.location)
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
   .then(results => {this.setState ({
     rests: results
   }, () => console.log("did this work?", this.state.rests))
  })
  this.renderSearchCards()
 }


  mapStateToProps(state) {
    return {
      keyword: state.keyword,
    }
    console.log("here", state.keyword)
  }

  renderSearchCards = () => {
    if (this.state.rests.length == 0) {
      return null
    } else {
      return this.state.rests.businesses.map(rest => {
        return (
        <RestaurantCard restaurant={rest} />
        )
      }
    )
    }
  }

  render() {
    return (
      <div>
        <h1> This is my Homepage </h1>
        <form onSubmit={this.handleSubmit}>
          Cuisine: <input type="text" value={this.state.cuisine} name="cuisine" onChange={this.handleChange} />
          Locations: <input type="text" value={this.state.location} name="location" onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>

        {this.renderSearchCards()}

      </div>
    );
  };
}

export default connect()(Home);
