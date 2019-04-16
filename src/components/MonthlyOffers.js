import React, { Component, Fragment } from 'react'
import RestaurantCard from './RestaurantCard'
import OfferCard from './OfferCard'
import Filter from './Filter'
import GoogleMap from './GoogleMap'
import { connect } from 'react-redux';
import { Button, Card, Image } from 'semantic-ui-react'
import { Map, GoogleApiWrapper } from 'google-maps-react';


class MonthlyOffers extends Component {

  state = {
    restaurants: [],
    openFilters: false
  }


  renderCards = () => {
  var d = new Date();
  let current_month = d.getMonth()
  let currentOffers = this.props.allOffers.filter(offer => offer.earn_month === current_month)
  if (this.props.selectedCity === 'All Cities') {
    return currentOffers.map(offer => {
      return (
          <OfferCard
          offer={offer}
          viewOnMap={this.props.viewOnMap}
          />
        )
      })
  }
  else {
    currentOffers = currentOffers.filter(offer => offer.restaurant.city === this.props.selectedCity)
    return currentOffers.map(offer => {
      return (
          <OfferCard
          offer={offer}
          viewOnMap={this.props.viewOnMap}
          />
        )
      })
    }
  }

renderMap = () => {
  return ( <GoogleMap />)
}

toggleFilters = () => {
  let filterState = !this.state.openFilters
  this.setState({
    openFilters: filterState
  })
}

renderFilters = () => {
  if (this.state.openFilters === true) {
    return (
      <Filter allRetaurants={this.props.allRestaurants}/>
    )
  } else {
    return null
  }
}

render () {
  let d = new Date();
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  let current_month = month[d.getMonth()];
  return (
    <Fragment>
      <h1 className="MealSteals"> {current_month}
       Offers
      <img onClick={() => this.toggleFilters()} className="headerMarker" src={process.env.PUBLIC_URL + '/arrow.png'}/>
      </h1>
      {this.renderFilters()}
      <Card.Group centered >
        {this.renderCards()}
      </Card.Group>
      <div>
      </div>
    </Fragment>
  )
}

}

export default connect(mapStateToProps)(MonthlyOffers)


function mapStateToProps(state) {
  return {
    current_user: state.current_user,
    allRestaurants: state.allRestaurants,
    allOffers: state.allOffers,
    allCoupons: state.allCoupons,
    selectedCity: state.selectedCity
  }
}
