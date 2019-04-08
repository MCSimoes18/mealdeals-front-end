import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

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
  if(this.props.user_type === "restaurant" || this.props.user_type === null){
    return(
      <div>
          <p> Offer: {this.props.offer.offer} </p>
          <p> Earn Month: {this.props.offer.earn_month} </p>
          <p> Redeem Month: {this.props.offer.redeem_month} </p>
          <p> ----------------------------- </p>
      </div>
    )
  } else if (this.props.user_type === "user"){
    return(
      <div>
          <p> Offer: {this.props.offer.offer} </p>
          <p> Earn Month: {this.props.offer.earn_month} </p>
          <p> Redeem Month: {this.props.offer.redeem_month} </p>
          <button onClick={() => this.getLocation()}> Check In Now </button>
          <p> ----------------------------- </p>
      </div>
      )
    }
  }

  render () {
    return (
      <div>
        {this.renderOfferCard()}
      </div>
    )
  }
}

export default connect(mapStateToProps)(OfferCard)


function mapStateToProps(state) {
  return {
    current_user: state.current_user,
    user_type: state.user_type
  }
}
