import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import { Button, Card, Image } from 'semantic-ui-react'

class OfferCard extends React.Component {
  state = {
    allRestaurants: [],
    user_latitude: "",
    user_longitude: ""
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/restaurants")
    .then(res => res.json())
    .then(res => {
      this.setState({
        allRestaurants: res
      })
    })
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  showPosition = (position) => {
    let current_latitude = position.coords.latitude
    let current_longitude = position.coords.longitude
    this.setState({
      user_latitude: current_latitude,
      user_longitude: current_longitude
    }, () => this.compareLocations())
  }

  floatCoordinates = (num) => {
     return Number.parseFloat(num).toFixed(3);
  }

  compareLocations = () => {
   let checkInRestaurant = this.state.allRestaurants.find(rest => rest.id === this.props.offer.restaurant_id)
   console.log("rest", checkInRestaurant.latitude)
   console.log("rest", checkInRestaurant.longitude)
   console.log("me", this.state.user_latitude)
   console.log("me", this.state.user_longitude)
   let floatRestLatitude = this.floatCoordinates(checkInRestaurant.latitude)
   let floatRestLongitude = this.floatCoordinates(checkInRestaurant.longitude)
   let floatUserLatitude = this.floatCoordinates(this.state.user_latitude)
   let floatUserLongitude = this.floatCoordinates(this.state.user_longitude)
   console.log("compare", floatRestLatitude, floatUserLatitude, floatRestLongitude, floatUserLongitude)
   if (floatRestLatitude == floatUserLatitude && floatRestLongitude == floatUserLongitude){
     console.log("check in")
     this.createCoupon()
   } else {
     console.log("not checked in")
   }
  }

  createCoupon = () => {
    let data = {
      offer_id: this.props.offer.id,
      user_id: this.props.current_user.id,
      active: false,
      status: ""
    }
    fetch("http://localhost:3000/api/v1/coupon_users", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accepts": "application/json"
       },
         body: JSON.stringify(data)
       })
       .then(res => res.json())
       .then(console.log)
  }



renderOfferCard = () => {
  var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    let earn_month = month[this.props.offer.earn_month]
    let redeem_month = month[this.props.offer.redeem_month]
  if(this.props.user_type === "restaurant" || this.props.user_type === null){
    let restaurant = this.props.allRestaurants.find(rest => rest.id === this.props.offer.restaurant_id)
    return(
        <Card style={{ marginLeft: '4em', marginRight: '2em'}} color={'green'}>
          <Card.Content>
            <Image floated='top' size='large' src={restaurant.image_url} />
            <Card.Header> {this.props.offer.offer} </Card.Header>
            <Card.Meta> {restaurant.name} </Card.Meta>
            <Card.Meta> {restaurant.address1} , {restaurant.city} </Card.Meta>
            <Card.Description> Earn During: {earn_month} </Card.Description>
          <Card.Description> Redeem During: {redeem_month} </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Button basic color='blue' style={{ width: '18.5em'}} >
        <NavLink to="/Login" component={Login}>
        Sign In To Redeem
        </NavLink>
        </Button>
        </Card.Content>
      </Card>
    )
  } else if (this.props.user_type === "user"){
    let restaurant = this.props.allRestaurants.find(rest => rest.id === this.props.offer.restaurant_id)
    return(
        <Card style={{ marginLeft: '4em', marginRight: '2em'}} color={'green'}>
          <Card.Content>
            <Image floated='top' size='large' src={restaurant.image_url} />
            <Card.Header> {this.props.offer.offer} </Card.Header>
            <Card.Meta> {restaurant.name} </Card.Meta>
            <Card.Meta> {restaurant.address1} , {restaurant.city} </Card.Meta>
            <Card.Description> Earn During: {earn_month} </Card.Description>
            <Card.Description> Redeem During: {redeem_month} </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Button onClick={() => this.getLocation()} basic color='yellow' style={{ width: '18.5em'}} > Check In Now </Button>
          </Card.Content>
      </Card>
      )
    }
  }


  render () {
    console.log("testinggggg", this.props.allRestaurants)
    return (
      <Fragment>
        {this.renderOfferCard()}
      </Fragment>
    )
  }
}

export default connect(mapStateToProps)(OfferCard)


function mapStateToProps(state) {
  return {
    current_user: state.current_user,
    user_type: state.user_type,
    allRestaurants: state.allRestaurants
  }
}
