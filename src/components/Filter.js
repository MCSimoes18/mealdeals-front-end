import React, { Component, Fragment } from 'react'
import RestaurantCard from './RestaurantCard'
import OfferCard from './OfferCard'
import Search from './Search'
import MonthlyOffers from './MonthlyOffers'
import { connect } from 'react-redux';
import { Button, Select, Item, Card, Image, Sidebar, Menu, Icon, Segment } from 'semantic-ui-react'
import { Map, GoogleApiWrapper, InfoWrapper, Marker } from 'google-maps-react';


class Filter extends Component {
  state = {
    displayAllCities: [],
    displayFilteredCities: [],
  }

  handleSelectChange = (e, data) => {
    console.log("handling select change")
    this.setState({
      [data.name]: data.value
    })
    this.props.dispatch({ type: "SELECTED_CITY", payload: data.value })
  }

render () {
  let distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  }

    Array.prototype.unique = function() {
    return this.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  }

  let allCities = this.props.allOffers.map(offer => offer.restaurant.city)

  let distinctCities = allCities.unique()

  let cityOptions = distinctCities.map(city => ({
    key: city,
    text: city,
    value: city,
  }))

  cityOptions = [{key: 'All Cities', text: 'All Cities', value: 'All Cities'}, ...cityOptions ]

  return (
    <div className='filterCities'>
    <Select placeholder='Select City' options={'All Cities', cityOptions} name='selectedCity'onChange={(e, data) => this.handleSelectChange(e, data)}/><br/> <br/> <br/>
    </div>
    )
  }

}


export default connect(mapStateToProps)(Filter)


  function mapStateToProps(state) {
    return {
      current_user: state.current_user,
      allRestaurants: state.allRestaurants,
      allOffers: state.allOffers,
      allCoupons: state.allCoupons
    }
  }
