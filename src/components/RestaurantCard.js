import React, { Component, Fragment } from 'react'

export default class RestaurantCard extends React.Component {

  state = {
    foundBusiness: false

  }

  registerRestaurant(business) {
    let data = {
      name: business.name
    }
     fetch("http://localhost:3000/api/v1/restaurants", {
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

    findBusiness = () => {
      this.setState({
        foundBusiness: true
      })
      this.props.selectRestaurant(this.props.restaurant)
    }

  render () {
    return (
      <div>
        <h1> {this.props.restaurant.name} </h1>
        <img src={this.props.restaurant.image_url} />
        <p> Address: {this.props.restaurant.location.display_address} </p>
        <p> Price: {this.props.restaurant.price} </p>
        <p> Rating: {this.props.restaurant.rating} </p>
        <p> Reviews: {this.props.restaurant.review_count} </p>
        <p> Contact: {this.props.restaurant.display_phone} </p>
        <a href={this.props.restaurant.url} target="_blank">View On Yelp</a>
        <br/>
        <button onClick={() => this.findBusiness()}>This is Me</button>
      </div>
    )
  }

}
