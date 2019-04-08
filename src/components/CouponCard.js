import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

class CouponCard extends React.Component {

  state = {
    currentRestaurant: ""
  }

  componentDidMount() {
    let findRestaurant = this.props.allRestaurants.find(rest => rest.id == this.props.coupon.offer.restaurant_id)
    this.setState({
      currentRestaurant: findRestaurant
    })
  }

  render() {
    return (
      <Fragment>
      <p> Restaurant: {this.state.currentRestaurant.name} </p>
      <p> Address: {this.state.currentRestaurant.address1, this.state.currentRestaurant.city, this.state.currentRestaurant.zip_code} </p>
      <p> {this.props.coupon.offer.offer} </p>
      <p> Earn Month: {this.props.coupon.offer.earn_month} </p>
      <p> Check In Month: {this.props.coupon.offer.redeem_month} </p>
      <p> Status: {this.props.coupon.status} </p>
      <p> -----------------------------------------</p>
      </Fragment>
    )
  }

}
  export default connect(mapStateToProps)(CouponCard);


  function mapStateToProps(state) {
    return {
      keyword: state.keyword,
      current_user: state.current_user,
      allRestaurants: state.allRestaurants
    }

    console.log("here", state.keyword)
  }
