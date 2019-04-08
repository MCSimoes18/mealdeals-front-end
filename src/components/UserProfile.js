import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import CouponCard from './CouponCard'

class UserProfile extends Component {
  state = {
    allCoupons: [],
    userCoupons: []
  }


  componentDidMount() {
    fetch("http://localhost:3000/api/v1/coupon_users")
    .then(res => res.json())
    .then(res => {
      let findUserCoupons = res.filter(coupon => coupon.user_id === this.props.current_user.id)
      this.setState({
        userCoupons: findUserCoupons
      })
    })
    fetch("http://localhost:3000/api/v1/restaurants")
    .then(res => res.json())
    .then(res => {
      this.props.dispatch({ type: "ALL_RESTAURANTS", payload: res })
    })
  }

  // findUserCoupons = () => {
  //   let findUserCoupons = this.state.allCoupons.filter(coupon => coupon.user_id === this.props.current_user.id)
  //   this.setState({
  //     userCoupons: findUserCoupons
  //   }, () => console.log("here are my coupons", this.state.userCoupons))
  // }

  // renderUserCoupons = () => {
  //   return this.state.userCoupons.map(coupon => {
  //     return <CouponCard coupon={coupon} />
  //   })
  // }

  renderUserCoupons = () => {
  return this.state.userCoupons.map(coupon => {
      return (
        <CouponCard
        coupon={coupon}
        />
      )
    })
  }

  // next step is to create coupon cards and iterate through them

  render() {
    return (
      <div>
      <h1> {this.props.current_user.name} </h1>
      {this.renderUserCoupons()}
      </div>
      )
    }
  }

export default connect(mapStateToProps)(UserProfile)


function mapStateToProps(state) {
  return {
    current_user: state.current_user
  }
}
