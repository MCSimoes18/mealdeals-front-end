import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

class CouponCard extends React.Component {

  state = {
    currentRestaurant: "",
    current_status: "not yet status"
  }

  componentDidMount() {
    let d = new Date();
    let current_month = d.getMonth()
    let findRestaurant = this.props.allRestaurants.find(rest => rest.id == this.props.coupon.offer.restaurant_id)
    this.setState({
      currentRestaurant: findRestaurant
    })
    if (this.props.coupon.offer.redeem_month === current_month){
      this.setState({
        current_status: "inactive"
      },() => this.patchStatus(this.state.current_status))
    }
    else if (this.props.coupon.offer.redeem_month < current_month){
      this.setState({
        current_status: "upcoming"
      },() => this.patchStatus(this.state.current_status))
    }
    else if (this.props.coupon.offer.redeem_month > current_month){
      this.setState({
        current_status: "expired"
      },() => this.patchStatus(this.state.current_status))
    }
  }

  patchStatus = (current_status) => {
    let data = {
      status: current_status
    }
    fetch(`http://localhost:3000/api/v1/coupon_users/${this.props.coupon.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(console.log)
    }

renderCoupon = () => {
  if (this.state.current_status === "inactive") {
    return (
      <div>
        <p> Restaurant: {this.state.currentRestaurant.name} </p>
        <p> Address: {this.state.currentRestaurant.address1, this.state.currentRestaurant.city, this.state.currentRestaurant.zip_code} </p>
        <p> {this.props.coupon.offer.offer} </p>
        <p> Earn Month: {this.props.coupon.offer.earn_month} </p>
        <p> Check In Month: {this.props.coupon.offer.redeem_month} </p>
        <p> Status: {this.state.current_status} </p>
        <button> Activate Now </button>
        <p> -----------------------------------------</p>
      </div>
    )} else {
    return (
      <div>
        <p> Restaurant: {this.state.currentRestaurant.name} </p>
        <p> Address: {this.state.currentRestaurant.address1, this.state.currentRestaurant.city, this.state.currentRestaurant.zip_code} </p>
        <p> {this.props.coupon.offer.offer} </p>
        <p> Earn Month: {this.props.coupon.offer.earn_month} </p>
        <p> Check In Month: {this.props.coupon.offer.redeem_month} </p>
        <p> Status: {this.state.current_status} </p>
        <p> -----------------------------------------</p>
      </div>
    )
  }
}

  render() {
    return (
      <Fragment>
      {this.renderCoupon()}
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
