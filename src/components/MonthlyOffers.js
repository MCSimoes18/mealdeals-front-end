import React, { Component, Fragment } from 'react'
import RestaurantCard from './RestaurantCard'


export default class MonthlyOffers extends Component {

  state = {
    restaurants: []
  }

componentDidMount() {
  fetch("http://localhost:3000/api/v1/restaurants")
  .then(res=>res.json())
  .then(rest => {
    this.setState({
      restaurants: rest
    }, () => console.log("?", this.state.restaurants))
  })
}


  renderCards = () => {
  return this.state.restaurants.map(rest => {
      return (
        <RestaurantCard restaurant={rest} />
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
