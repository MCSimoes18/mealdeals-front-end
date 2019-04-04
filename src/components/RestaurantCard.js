import React, { Component, Fragment } from 'react'

export default class RestaurantCard extends React.Component {

  render () {
    return (
      <div>
        <h1> {this.props.restaurant.name} </h1>
      </div>
    )
  }

}
