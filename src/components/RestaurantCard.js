import React, { Component, Fragment } from 'react'
import { Card, Image, Button, Rating, Container} from 'semantic-ui-react'
import { connect } from 'react-redux';


class RestaurantCard extends React.Component {

  state = {
    foundBusiness: false
  }

    findBusiness = () => {
      this.setState({
        foundBusiness: true
      })
      this.props.selectRestaurant(this.props.restaurant)
    }

    renderRestCards() {
      if (this.props.user_type === "before_restaurant") {
        return (
          <Card style={{ marginLeft: '4em', marginRight: '2em', marginBottom: '6em'}}>
            <Card.Content>
              <Image src={this.props.restaurant.image_url} alt="image" style={{width:'350px'}, {height:'300px'}}/>
              <h1>{this.props.restaurant.name}</h1>
              <h4><b>{this.props.restaurant.location.address1},  {this.props.restaurant.location.city},  {this.props.restaurant.location.zip_code}</b></h4>
              <p>{this.props.restaurant.price}</p>
              <Rating icon='star' rating={this.props.restaurant.rating} maxRating={5} disabled/>
            </Card.Content>
            <Button onClick={() => this.findBusiness()}>
              This is Me
            </Button>
          </Card>
          )
      } else if (this.props.user_type === null || this.props.user_type === "user") {
        return (
          <Card style={{ marginLeft: '4em', marginRight: '2em', marginBottom: '6em'}}>
            <Card.Content>
              <Image src={this.props.restaurant.image_url} alt="image" style={{width:'350px'}, {height:'300px'}}/>
              <h1>{this.props.restaurant.name}</h1>
              <h4><b>{this.props.restaurant.location.address1},  {this.props.restaurant.location.city},  {this.props.restaurant.location.zip_code}</b></h4>
              <p>{this.props.restaurant.price}</p>
              <Rating icon='star' rating={this.props.restaurant.rating} maxRating={5} disabled/>
            </Card.Content>
            <Card.Content extra>
            <Button basic color='red' style={{ width: '18.5em', marginBottom: '1em'}}>
              <a href={this.props.restaurant.url} target="_blank" className="yelpTxt"> View On Yelp </a>
            </Button>

            <Button basic color='blue' style={{ width: '18.5em', marginBottom: '1em'}} onClick={() => this.props.viewOnMap(this.props.restaurant)}>
            View On Map
            </Button>
            </Card.Content>
          </Card>
          )
      }
    }

  render () {
    return (
      <div>
      {this.renderRestCards()}
      </div>
    )
  }
}

  export default connect(mapStateToProps)(RestaurantCard)


  function mapStateToProps(state) {
    return {
      current_user: state.current_user,
      user_type: state.user_type
    }
  }
