import React, { Component, StyleSheet } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Redux //
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
// Import Components //
import NavBar from './NavBar';
import RestaurantCard from './RestaurantCard';
import Login from './Login';
import RestaurantLogin from './RestaurantLogin';
import Search from './Search';
import { Card, Button, Input, Container, Grid, Divider, Segment} from 'semantic-ui-react'


class Home extends React.Component {

  state = {
    cuisine: "",
    location: "",
    redirect: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({ type: "SEARCH_LOC", payload: this.state.location })
    this.props.dispatch({ type: "SEARCH_CUISINE", payload: this.state.cuisine })
    this.setState({ location: "", cuisine: "" });
    console.log("cuisine", this.state.cuisine)
    console.log("location", this.state.location)
    this.handleSearch(this.state.cuisine, this.state.location)
  }


  //listening in render() for changed state
  renderRedirect = () => {
      if (this.props.rests === undefined ){
        return null
      }
      else if (this.props.rests === null ){
        return null
      }
      else if (this.props.rests.businesses.length > 0) {
        return <Redirect to='/Search' />
      }
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


  // renderSearchCards = () => {
  //   if (this.state.rests.length == 0) {
  //     return null
  //   } else {
  //     return this.state.rests.businesses.map(rest => {
  //       return (
  //       <RestaurantCard restaurant={rest} />
  //       )
  //     }
  //   )
  //   }
  // }


  render() {


    console.log(this.props)
    return (
      <div className="home">
        <h1 className="title"> Meal Deals </h1>
        <div className="searchBar">
          <form onSubmit={this.handleSubmit}>
            <Input type="text" name="cuisine" onChange={this.handleChange} placeholder="cuisine.."/>
            <Input type="text" name="location" onChange={this.handleChange} placeholder="location.." action={{ icon: 'search' }}/>
          </form>
        </div>
        <Segment style={{height: '900px;'}} >
          <Grid columns={2} relaxed='very' stackable >
            <Grid.Column>
            <Container fluid className="userSide">
            <br/>
            <img
            className="eat"
            style={{width: '200px'}}
            src={process.env.PUBLIC_URL + '/food.png'}
            alt="user"
            />
            <h1> I eat food </h1>
            <p> Visit Restaurants of the Month during the earn month. Check-In on the app while dining at the restaurant and receive a coupon voucher to come back during the redeem month. Make sure to activate the coupon in front of a server. </p>
            <Button>
            <NavLink to="/Login" component={Login}>
                Sign Up
            </NavLink>
            </Button>
            </Container>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
            <Container fluid className="restSide">
            <img
            className="feed"
            src={process.env.PUBLIC_URL + '/chef.png'}
            alt="restaurant"
            />
            <h1 style={{textAlign:'center;'}}
            > I make food </h1>
            <p> Register your business with us to promote local offers on Meal Deals. <br/> Each offer will be eligible for a full month (what we call the "Redeem Month"), contingent that the customer checked-in at your restaurant, during the prior month, (what we call the "Earn Month"). <br/> Meal Deals is great way to promote your businesses <br/> visibility, acquire new customers and return customers </p>
            <br/>
            <Button>
            <NavLink to="/RestaurantLogin" component={RestaurantLogin}>
                Sign Up
            </NavLink>
            </Button>
            </Container>
            </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
            </Segment>
        <Card.Group text style={{ marginTop: '7em' }}>
          {this.renderRedirect()}
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
    rests: state.rests
  }

  console.log("here", state.keyword)
}
