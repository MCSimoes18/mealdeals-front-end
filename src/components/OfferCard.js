import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import { Button, Container, Card, Image, Modal, Divider} from 'semantic-ui-react'
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

class OfferCard extends React.Component {
  state = {
    user_latitude: "",
    user_longitude: "",
    open: false,
    current_restaurant: null,
    showCharts: true
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/restaurants")
    .then(res => res.json())
    .then(res => {
      this.props.dispatch({ type: "ALL_RESTAURANTS", payload: res })
    })
    fetch("http://localhost:3000/api/v1/offers")
    .then(res => res.json())
    .then(res => {
      this.props.dispatch({ type: "ALL_OFFERS", payload: res })
    })
    fetch("http://localhost:3000/api/v1/coupon_users")
    .then(res => res.json())
    .then(res => {
      this.props.dispatch({ type: "ALL_COUPONS", payload: res })
    })
  }

  close = () => this.setState({ open: false })

  openModal = () => {
      if (this.state.open === "checkInTrue" ) {
        let current_restaurant = this.state.current_restaurant
        return (
          <Fragment>
            <Modal size={'tiny'} open={this.state.open} onClose={this.close}>
            <Modal.Header>Congrats! Youre Checked In!</Modal.Header>
            <Modal.Content>
            <p>A coupon for {this.state.current_restaurant.name} has been added to your coupons. </p>
            </Modal.Content>
            <Modal.Actions>
            <Button onClick={()=>this.close()}positive icon='checkmark' labelPosition='right' content='Got It!' />
            </Modal.Actions>
            </Modal>
        </Fragment>
      )
    } else if (this.state.open === "checkInFalse"  ) {
        let current_restaurant = this.state.current_restaurant
        return (
          <Fragment>
            <Modal size={'tiny'} open={this.state.open} onClose={this.close}>
            <Modal.Header>Oops! Something went wrong...</Modal.Header>
            <Modal.Content>
            <p> It doesnt appear that youre at {this.state.current_restaurant.name} at {this.state.current_restaurant.address1}, in {this.state.current_restaurant.city}. Please be sure to check in when you are on-site at this restaurant. </p>
            </Modal.Content>
            <Modal.Actions>
            <Button onClick={()=>this.close()}positive icon='checkmark' labelPosition='right' content='Got It!' />
            </Modal.Actions>
            </Modal>
          </Fragment>
        )
    } else  {
      return null
    }
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  showPosition = (position) => {
    let current_latitude = position.coords.latitude
    let current_longitude = position.coords.longitude
    this.setState({
      user_latitude: current_latitude,
      user_longitude: current_longitude
    }, () => this.compareLocations())
  }

  floatCoordinates = (num) => {
     return Number.parseFloat(num).toFixed(3);
  }

  compareLocations = () => {
   let checkInRestaurant = this.props.allRestaurants.find(rest => rest.id === this.props.offer.restaurant_id)
   this.setState({
     current_restaurant: checkInRestaurant
   })
   let floatRestLatitude = this.floatCoordinates(checkInRestaurant.latitude)
   let floatRestLongitude = this.floatCoordinates(checkInRestaurant.longitude)
   let floatUserLatitude = this.floatCoordinates(this.state.user_latitude)
   let floatUserLongitude = this.floatCoordinates(this.state.user_longitude)
   let latitudeDifference = floatRestLatitude - floatUserLatitude
   let longitudeDifference = floatRestLongitude - floatUserLongitude

   console.log("compare", floatRestLatitude, floatUserLatitude, floatRestLongitude, floatUserLongitude, latitudeDifference, longitudeDifference)
   if (latitudeDifference > -.0011  && latitudeDifference < .0011 && longitudeDifference > -.0011 && longitudeDifference < .0011 ){
     console.log("check in")
     this.createCoupon()
     this.setState({
       open: "checkInTrue"
     })
   } else {
     console.log("not checked in")
     this.setState({
       open: "checkInFalse"
     })
   }
  }

  createCoupon = () => {
    console.log("pre-dispatch", this.props.allCoupons)
    let data = {
      offer_id: this.props.offer.id,
      user_id: this.props.current_user.id,
      active: false,
      status: ""
    }
    fetch("http://localhost:3000/api/v1/coupon_users", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Accepts": "application/json"
       },
         body: JSON.stringify(data)
       })
       .then(res => res.json())
       .then(res => {
         this.props.dispatch({ type: "ADD_COUPON", payload: res })
         this.props.dispatch({ type: "NEW_COUPON", payload: res })
       })
  }



renderOfferCard = () => {
  // convert month value to string for display
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
    // using month array to display string instead of value
    if (this.props.user_type === undefined || this.props.allRestaurants.length === 0 || this.props.offer === null) {
      return <h3> LOADING </h3>
    }
    else {
    let earn_month = month[this.props.offer.earn_month]
    let redeem_month = month[this.props.offer.redeem_month]
    if (this.props.user_type === null || this.props.user_type == 'before_restaurant'){
    let restaurant = this.props.allRestaurants.find(rest => rest.id === this.props.offer.restaurant_id)
      return(
        <Card style={{ marginLeft: '4em', marginRight: '2em'}} color={'red'}>
          <Card.Content>
            <Image floated='top' size='large' src={restaurant.image_url} />
            <Card.Header> {this.props.offer.offer} </Card.Header>
            <Card.Meta> {restaurant.name} </Card.Meta>
            <Card.Meta> {restaurant.address1} , {restaurant.city} </Card.Meta>
            <Card.Description> Earn During: {earn_month} </Card.Description>
          <Card.Description> Redeem During: {redeem_month} </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Button basic color='blue' style={{ width: '18.5em', marginBottom: '1em'}} onClick={() => this.props.viewOnMap(restaurant, this.props.offer)}>
          View On Map
        </Button>
        <Button basic color='red' style={{ width: '18.5em', marginBottom: '1em'}} >
          <NavLink to="/Login" component={Login} style={{color: 'red'}}>
            Sign In To Redeem
            </NavLink>
        </Button>
        </Card.Content>
      </Card>
    )
  } else if (this.props.user_type === "user"){
    let restaurant = this.props.allRestaurants.find(rest => rest.id === this.props.offer.restaurant_id)
      return(
          <Card style={{ marginLeft: '4em', marginRight: '2em'}} color={'green'}>
            <Card.Content>
              <Image floated='top' size='large' src={restaurant.image_url} />
              <Card.Header> {this.props.offer.offer} </Card.Header>
              <Card.Meta> {restaurant.name} </Card.Meta>
              <Card.Meta> {restaurant.address1} , {restaurant.city} </Card.Meta>
              <Card.Description> Earn During: {earn_month} </Card.Description>
              <Card.Description> Redeem During: {redeem_month} </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button onClick={() => this.getLocation()} basic color='yellow' style={{ width: '18.5em'}} > Check In Now </Button>
            </Card.Content>
        </Card>
        )
    }
      if (this.props.user_type === "restaurant"){
      let restaurant = this.props.allRestaurants.find(rest => rest.id === this.props.offer.restaurant_id)
      if (restaurant) {
      ////////////////////////////////////////////////////////
      /////// variables defined for coupon analytics /////////
      ////////////////////////////////////////////////////////
      //  all coupons this month////
      let thisMonthsCoupons = this.props.allCoupons.filter(coupon => coupon.offer.earn_month === this.props.offer.earn_month)
      // all coupons this month belonging to this offer
      let myCouponsThisMonth = thisMonthsCoupons.filter(coupon => coupon.offer.id === this.props.offer.id)
      let myCouponCount = myCouponsThisMonth.length
      let notMyCouponCount = thisMonthsCoupons.length - myCouponCount
      // all coupons this month belonging to this offer that are redeemed
      let redeemedCoupons = myCouponsThisMonth.filter(coupon => coupon.status === "Redeemed")
      // how many people checked into this offer out of all the check ins this month?
      let checkInRate = ((myCouponsThisMonth.length / thisMonthsCoupons.length) * 100).toFixed(0)
      // how many of my coupons for this offer have been redeemed?
      let redemptionRate = ((redeemedCoupons.length / myCouponsThisMonth.length) * 100).toFixed(0)
      let redeemedCount = parseInt(redeemedCoupons.length)
      let unRedeemedCount = parseInt(myCouponsThisMonth.length - redeemedCount)
      if (isNaN(redemptionRate)){
        redemptionRate = "N/A"
      }
      if (!isNaN(redemptionRate)){
        redemptionRate = `${redemptionRate} %`
      }
      if (isNaN(checkInRate)){
        checkInRate = "N/A"
      }
      if (!isNaN(checkInRate)){
        checkInRate = `${checkInRate} %`
      }

      return(
        <div>
        <Container>
        <h4 className="rateTxt1"> Redemption Rate </h4>
        <h2 className="rate1"> {redemptionRate}  </h2>
        <h4 className="rateTxt2"> Check In Rate </h4>
        <h2 className="rate2"> {checkInRate} </h2>
        <br/>
        <br/>
          <Card style={{ marginLeft: '4em', marginRight: '2em'}} color={'green'} className="restOfferCard">
            <Card.Content>
              <Image floated='top' size='large' src={restaurant.image_url} />
              <Card.Header> {this.props.offer.offer} </Card.Header>
              <Card.Meta> {restaurant.name} </Card.Meta>
              <Card.Meta> {restaurant.address1} , {restaurant.city} </Card.Meta>
              <Card.Description> Earn During: {earn_month} </Card.Description>
            <Card.Description> Redeem During: {redeem_month} </Card.Description>
          </Card.Content>
        </Card>
        {this.showPieCharts(checkInRate, redemptionRate, redeemedCount, unRedeemedCount, myCouponCount, notMyCouponCount)}
        </Container>
        <Divider />
        </div>
      )
    }
    else {
      return <h3> LOADING </h3>
    }
    }
  }
}

showPieCharts = (checkInRate, redemptionRate, redeemedCount, unRedeemedCount, myCouponCount, notMyCouponCount) => {
  if (checkInRate == "N/A" || redemptionRate == "N/A") {
    return (<h3 className="noAnalytics"> offer analytics are not yet available. </h3>)
  } else {
      return (
        <Fragment>
        <div className='pieChart1'>
        <PieChart data={[[ "Redeemed", redeemedCount], ["Total Check-Ins", unRedeemedCount]]} />
        </div>
        <div className='pieChart2'>
        <PieChart data={[["Your Check-Ins", myCouponCount], ["Total Meal Deals Check-Ins", notMyCouponCount]]} />
        </div>
        </Fragment>
      )
    }
}

  render () {
    return (
      <Fragment>
        {this.renderOfferCard()}
        {this.openModal()}
      </Fragment>
    )
  }

}


export default connect(mapStateToProps)(OfferCard)


function mapStateToProps(state) {
  return {
    current_user: state.current_user,
    user_type: state.user_type,
    allRestaurants: state.allRestaurants,
    allOffers: state.allOffers,
    allCoupons: state.allCoupons
  }
}
