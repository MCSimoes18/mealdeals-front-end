import React, { Component, Fragment } from 'react'
import RestaurantCard from './RestaurantCard'
import OfferCard from './OfferCard'
import { connect } from 'react-redux';
import { Button, Card, Image } from 'semantic-ui-react'
import { Map, GoogleApiWrapper } from 'google-maps-react';


class MonthlyOffers extends Component {

  state = {
    restaurants: [],
  }

// componentDidMount() {
//   fetch("http://localhost:3000/api/v1/offers")
//   .then(res=>res.json())
//   .then(res => {
//     this.props.dispatch({ type: "ALL_OFFERS", payload: res })
//   })
//   fetch("http://localhost:3000/api/v1/restaurants")
//     .then(res => res.json())
//     .then(res => {
//       this.props.dispatch({ type: "ALL_RESTAURANTS", payload: res })
//     })
//     fetch("http://localhost:3000/api/v1/coupon_users")
//     .then(res => res.json())
//     .then(res => {
//       this.props.dispatch({ type: "ALL_COUPONS", payload: res })
//     })
//   }


  renderCards = () => {
  var d = new Date();
  let current_month = d.getMonth()
  let currentOffers = this.props.allOffers.filter(offer => offer.earn_month === current_month)
  return currentOffers.map(offer => {
    return (
        <OfferCard
        offer={offer}
        />
      )
    })
}

render () {
  let d = new Date();
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
  let current_month = month[d.getMonth()];
  return (
    <Fragment>
      <h1> {current_month} Offers </h1>
      <Card.Group centered >
        {this.renderCards()}
      </Card.Group>
    </Fragment>
  )
}

}

export default connect(mapStateToProps)(MonthlyOffers)


function mapStateToProps(state) {
  return {
    current_user: state.current_user,
    allRestaurants: state.allRestaurants,
    allOffers: state.allOffers,
    allCoupons: state.allCoupons
  }
}
