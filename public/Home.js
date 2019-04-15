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
import SignUp from './SignUp';
import RestaurantSignUp from './RestaurantSignUp';
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
            <br/> Get rewarded for eating with eating. <br/>
            <p> Check-In at local restaurants during their designated earn-period.
            <br/> Then come back and redeem exclusive offers. </p>
            <Button>
            <NavLink to="/SignUp" component={SignUp}>
                Sign Up
            </NavLink>
            </Button>
            <Button>
            <NavLink to="/Login" component={Login}>
                Login
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
            <p> Promote your business with Meal Deals.
            <br/> Gain visibility, acquire new customers and increase your customer retention. <br/>Sign up and start submitting exclusive offers.</p>
            <br/>
            <Button>
            <NavLink to="/RestaurantSignUp" component={RestaurantSignUp}>
                Sign Up
            </NavLink>
            </Button>
            <Button>
            <NavLink to="/RestaurantLogin" component={RestaurantLogin}>
                Login
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
