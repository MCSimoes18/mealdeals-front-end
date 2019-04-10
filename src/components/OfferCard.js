import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import { Button, Card, Image, Modal } from 'semantic-ui-react'

class OfferCard extends React.Component {
  state = {
    allRestaurants: [],
    user_latitude: "",
    user_longitude: "",
    open: false,
    current_restaurant: null
  }

  close = () => this.setState({ open: false })

  openModal = () => {
    if (this.state.open === "checkInTrue" ) {
      let current_restaurant = this.state.current_restaurant
      return (
      <Fragment>
      <Modal size={'tiny'} open={this.state.open} onClose={this.close}>
      <Modal.Header>Congrats! Youre Checked In!</Modal.Header>
      <Modal.Content>
      <p>A coupon for {this.state.current_restaurant.name} has been added to your coupons. </p>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={()=>this.close()}positive icon='checkmark' labelPosition='right' content='Got It!' />
      </Modal.Actions>
      </Modal>
      </Fragment>
    )
  } else if (this.state.open === "checkInFalse"  ) {
      let current_restaurant = this.state.current_restaurant
      return (
      <Fragment>
      <Modal size={'tiny'} open={this.state.open} onClose={this.close}>
      <Modal.Header>Oops! Something went wrong...</Modal.Header>
      <Modal.Content>
      <p> It doesnt appear that youre at {this.state.current_restaurant.name} at {this.state.current_restaurant.address1}, in {this.state.current_restaurant.city}. Please be sure to check in when you are on-site at this restaurant. </p>
      </Modal.Content>
      <Modal.Actions>
      <Button onClick={()=>this.close()}positive icon='checkmark' labelPosition='right' content='Got It!' />
      </Modal.Actions>
      </Modal>
      </Fragment>
    )
    }
    else  {
      return null

  }
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
   this.setState({
     current_restaurant: checkInRestaurant
   })
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
     this.setState({
       open: "checkInTrue"
     })
   } else {
     console.log("not checked in")
     this.setState({
       open: "checkInFalse"
     })
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
  if (this.props.user_type === null){
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
    if (this.props.user_type === "restaurant"){
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
          <Button basic color='red' style={{ width: '18.5em'}} >
          Delete Offer
          </Button>
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
        {this.openModal()}
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
