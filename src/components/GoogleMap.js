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
  animation: 'overlay',
  direction: 'left',
  dimmed: false,
  visible: false,
  activeMarker: {},
  lat: 40.7128,
  long: -74.0060,
  name: "",
}

viewOnMap = (restaurant) => {
  this.setState({
    lat: restaurant.latitude,
    long: restaurant.longitude,
    name: restaurant.name
  }, () => this.makeVisible())
}

makeVisible = () => {
  this.setState({
    visible: true
  })
}

renderMap = () => {
  const mapStyles = {
    width: '100%',
    height: '100%'
  }

  let iconMarker = new window.google.maps.MarkerImage(
                process.env.PUBLIC_URL + '/foodMarker.png',
                null, /* size is determined at runtime */
                null, /* origin is 0,0 */
                null, /* anchor is bottom center of the scaled image */
                new window.google.maps.Size(50, 50)
              )
  return (
    <Fragment>
    <Item className="closeMap" onClick={()=>this.closeMap()}> Close Map </Item>
    <Map
    google={this.props.google}
    zoom={12}
    style={mapStyles}
    center = {{ lat: this.state.lat, lng: this.state.long }}
    >
    <Marker
      icon={iconMarker}
      name={this.state.name}
      position = {{ lat: this.state.lat, lng: this.state.long }}
    />
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
    <Sidebar.Pushable as={Segment}>
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
