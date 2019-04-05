import React, { Component, Fragment } from 'react'

export default class RestaurantCard extends React.Component {

  render () {
    return (
      <div>
        <h1> {this.props.restaurant.name} </h1>
        <img src={this.props.restaurant.image_url} />
        <p> Address: {this.props.restaurant.location.address1} </p>
        <p> Price: {this.props.restaurant.price} </p>
        <p> Rating: {this.props.restaurant.rating} </p>
        <p> Reviews: {this.props.restaurant.review_count} </p>
        <p> Contact: {this.props.restaurant.phone} </p>
      </div>
    )
  }

}
