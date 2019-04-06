import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

export default class OfferCard extends React.Component {

render () {
  return (
    <div>
      <p> Offer: {this.props.offer.offer} </p>
      <p> Earn Month: {this.props.offer.earn_month} </p>
      <p> Redeem Month: {this.props.offer.redeem_month} </p>
    </div>
  )
}

}
