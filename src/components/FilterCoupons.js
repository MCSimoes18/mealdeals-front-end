import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Select } from 'semantic-ui-react'

class FilterCoupons extends Component {
  state = {
    displayAllCoupons: [],
    displayFilteredCoupons: [],
  }

handleSelectChange = (e, data) => {
  console.log("handling select change")
  this.setState({
    [data.name]: data.value
  })
  this.props.dispatch({ type: "SELECTED_COUPON", payload: data.value })
}

render () {

  let couponStatuses = [
    {key: 'All Coupons', text: 'All Coupons', value: 'All Coupons'},
    {key: 'inactive', text: 'inactive', value: 'inactive'},
    {key: 'redeemed', text: 'Redeemed', value: 'Redeemed'},
    {key: 'expired', text: 'expired', value: 'expired'},
    {key: 'upcoming', text: 'upcoming', value: 'upcoming'}
  ]

  return (
    <div className='filterCities'>
      <Select placeholder='Select Status' options={'All Coupons', couponStatuses} name='selectedCoupon'onChange={(e, data) => this.handleSelectChange(e, data)}/><br/> <br/> <br/>
    </div>
  )
  }
}

  export default connect(mapStateToProps)(FilterCoupons)


    function mapStateToProps(state) {
      return {
        current_user: state.current_user,
        allRestaurants: state.allRestaurants,
        allOffers: state.allOffers,
        allCoupons: state.allCoupons
      }
    }
