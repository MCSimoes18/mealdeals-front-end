import React, { Component, Fragment } from 'react'
import RestaurantCard from './RestaurantCard'
import OfferCard from './OfferCard'
import MonthlyOffers from './MonthlyOffers'
import { connect } from 'react-redux';
import { Button, Item, Card, Image, Sidebar, Menu, Icon, Segment } from 'semantic-ui-react'
import { Map, GoogleApiWrapper, InfoWrapper, Marker } from 'google-maps-react';
import {GOOGLE_KEY} from '../keys.js'

class GoogleMap extends Component {

state = {
  currentOffers: null,
  filteredCurrentOffers: null,
  animation: 'overlay',
  direction: 'left',
  dimmed: false,
  visible: false,
  activeMarker: {},
  lat: 40.7128,
  long: -74.0060,
  name: "",
}

componentDidMount = () => {
  fetch("http://localhost:3000/api/v1/offers")
  .then(res => res.json())
  .then(res => this.setState({ currentOffers: res, filteredCurrentOffers: res }))
}

componentDidUpdate = (prevProps, prevState) => {
    // if (prevProps.lat !== this.state.lat) {
    //   this.setState({
    //     lat: this.props.events[0].latitude,
    //     longitude: this.props.events[0].longitude
    //   })
    // }
  }

makeVisible = () => {
  this.setState({
    visible: true

  })
}

viewOnMap = (restaurant, offer) => {
  this.makeVisible()
  if (this.state.currentOffers != null) {
    let uniqueCurrentOffers = this.state.filteredCurrentOffers.filter(o => o.restaurant_id != restaurant.id)
    this.setState({
      lat: restaurant.latitude,
      long: restaurant.longitude,
      name: restaurant.name,
      currentOffers: uniqueCurrentOffers,
    })
  }
}

returnMarkers = () => {
  if (this.state.currentOffers === null) {
    return null
  } else if (this.state.visible === true){
    let iconMarker = new window.google.maps.MarkerImage(
                  process.env.PUBLIC_URL + '/blue.png',
                  null, /* size is determined at runtime */
                  null, /* origin is 0,0 */
                  null, /* anchor is bottom center of the scaled image */
                  new window.google.maps.Size(20, 25)
                )
    let chosenIconMarker = new window.google.maps.MarkerImage(
                  process.env.PUBLIC_URL + '/foodMarker.png',
                  null, /* size is determined at runtime */
                  null, /* origin is 0,0 */
                  null, /* anchor is bottom center of the scaled image */
                  new window.google.maps.Size(50, 50)
                )
    let chosenMarker =
    <Marker
    icon={chosenIconMarker}
    title={this.state.name}
    position = {{ lat: this.state.lat, lng: this.state.long }}
    />
    let displayMarkers = this.state.currentOffers.map(offer =>
        <Marker
        icon={iconMarker}
        title={offer.restaurant.name}
        position = {{ lat: offer.restaurant.latitude, lng: offer.restaurant.longitude }}
        />
      )
    displayMarkers = [...displayMarkers, chosenMarker]
    return displayMarkers
  }
  else {
    return null
  }
}


renderMap = () => {
  const mapStyles = {
    width: '100%',
    height: '100%'
  }

  return (
    <Fragment>
    <Item className="closeMap" onClick={()=>this.closeMap()}> Close Map </Item>
    <Map
    google={this.props.google}
    zoom={12}
    style={mapStyles}
    center = {{ lat: this.state.lat, lng: this.state.long }}
    >
    {this.returnMarkers()}
    </Map>
    </Fragment>
  )
}

closeMap = () => {
  this.setState({
    visible: false
  })
}


returnDisplay = () => {
  return (
  <Fragment>
    <Sidebar.Pushable as={Segment} className="mapSideBar">
      <Sidebar as={Menu}
        animation={'push'}
        direction={'left'}
        icon='labeled'
        inverted
        vertical
        visible={this.state.visible}
        style={{width:'30%'}}>
        {this.renderMap()}
      </Sidebar>
    <Sidebar.Pusher>
      <Segment basic>
        <MonthlyOffers viewOnMap={this.viewOnMap}/>
      </Segment>
    </Sidebar.Pusher>
    </Sidebar.Pushable>
  </Fragment>
  )
}

render () {
  return (
    <Fragment>
    {this.returnDisplay()}
    </Fragment>
    )
   }
 }

 export default GoogleApiWrapper({
   apiKey: GOOGLE_KEY
 })(GoogleMap);
