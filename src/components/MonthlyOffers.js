import React, { Component, Fragment } from 'react'
import RestaurantCard from './RestaurantCard'
import OfferCard from './OfferCard'


export default class MonthlyOffers extends Component {

  state = {
    restaurants: [],
    offers: []
  }

componentDidMount() {
  fetch("http://localhost:3000/api/v1/offers")
  .then(res=>res.json())
  .then(res => {
    this.setState({
      offers: res
    }, () => console.log("?", this.state.offers))
  })
}


  // renderCards = () => {
  // return this.state.restaurants.map(rest => {
  //     return (
  //       <RestaurantCard restaurant={rest} />
  //     )
  //   })
  // }

  renderCards = () => {
  var d = new Date();
  let current_month = d.getMonth()
  let currentOffers = this.state.offers.filter(offer => offer.earn_month === current_month)
  return currentOffers.map(offer => {
      return (
        <OfferCard
        offer={offer}
        />
      )
    })
  }

render () {
  return (
    <div>
      <h1> View All Monthly Offers </h1>
      {this.renderCards()}
    </div>
  )
}

}
