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
          <Card style={{ marginLeft: '4em', marginRight: '2em'}}>
            <Card.Content>
              <Image src={this.props.restaurant.image_url} alt="image" style={{width:'350px'}, {height:'300px'}}/>
              <h1>{this.props.restaurant.name}</h1>
              <h4><b>{this.props.restaurant.location.display_address}</b></h4>
              <p>{this.props.restaurant.price}</p>
              <Rating icon='star' defaultRating={this.props.restaurant.rating} maxRating={5} disabled />
            </Card.Content>
            <button onClick={() => this.findBusiness()}>
              This is Me
            </button>
          </Card>
          )
      } else if (this.props.user_type === null || this.props.user_type === "user") {
        return (
          <Card style={{ marginLeft: '4em', marginRight: '2em'}}>
            <Card.Content>
              <Image src={this.props.restaurant.image_url} alt="image" style={{width:'350px'}, {height:'300px'}}/>
              <h1>{this.props.restaurant.name}</h1>
              <h4><b>{this.props.restaurant.location.display_address}</b></h4>
              <p>{this.props.restaurant.price}</p>
              <Rating icon='star' defaultRating={this.props.restaurant.rating} maxRating={5} disabled />
            </Card.Content>
            <button>
              <a href={this.props.restaurant.url} target="_blank"> View On Yelp </a>
            </button>
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




//
//
//
//
//
//
//
//
//       <Card.Content>
//         image={this.props.restaurant.image_url}
//         header={this.props.restaurant.name}
//         meta={this.props.restaurant.rating} Stars
//         description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
//       />
//     )
//   }
// }



// <img src={this.props.restaurant.image_url} />
// <p> Address: {this.props.restaurant.location.display_address} </p>
// <p> Price: {this.props.restaurant.price} </p>
// <p> Rating: {this.props.restaurant.rating} </p>
// <p> Reviews: {this.props.restaurant.review_count} </p>
// <p> Contact: {this.props.restaurant.display_phone} </p>
// <a href={this.props.restaurant.url} target="_blank">View On Yelp</a>
// <br/>
// <button onClick={() => this.findBusiness()}>This is Me</button>
// </div>
