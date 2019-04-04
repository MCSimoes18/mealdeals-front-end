import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Redux //
import { connect } from 'react-redux';
// Import Components //
import NavBar from './NavBar';

class Home extends React.Component {

  state = {
    term: "",
    zip: "",
    restaurants: []
  }

  handleChange = (event) => {
    this.setState({ term: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "SEARCH", payload: this.state.term })
    this.setState({ term: "" });
    console.log(this.state.term)

    this.handleSearch(this.state.term)
  }

  handleSearch = (searchTerm) => {
    const body = JSON.stringify(searchTerm)
    return fetch("http://localhost:3000/api/v1/yelp", {
        method: "POST",
        headers: {
        'Accept': 'application/json',
  'Content-Type': 'application/json',
       },
       'body': body
   })
    .then(res => res.json())
    .then(console.log)
    // .then(res => res = res.businesses.slice(0,8))
    // .then(res => this.setState({
    //   search: res
    // }))
  }

  mapStateToProps(state) {
  return {
    keyword: state.keyword,
  }
  console.log("here", state.keyword)
}



  render() {
    return (
      <div>
        <h1> This is my Homepage </h1>
        <form onSubmit={this.handleSubmit}>
          Keyword: <input type="text" value={this.state.term} onChange={this.handleChange} />
          Zip Code: <input type="text" value={this.state.zip} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };
}
export default connect()(Home);
