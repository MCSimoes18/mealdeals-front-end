import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Card, Button, Input, Container, Grid, Divider, Segment, Modal} from 'semantic-ui-react'
class CouponCard extends React.Component {

  state = {
    current_status: "not yet status",
    open: false,
    couponColor: 'green',
    buttonText: 'Activate Now',
    showStatus: 'inactive',
    currentRestaurant: null
  }

  close = () => this.setState({ open: false })

  componentDidMount() {
    let d = new Date();
    let current_month = d.getMonth()
    let findRestaurant = this.props.allRestaurants.find(rest => rest.id == this.props.coupon.offer.restaurant_id)
    this.setState({
      currentRestaurant: findRestaurant
    })
    if (this.props.coupon.offer.redeem_month === current_month && this.props.coupon.status !== 'Redeemed' && this.props.coupon.status !== 'Active Now'){
      this.setState({
        current_status: "inactive"
      },() => this.patchStatus(this.state.current_status))
    }
    else if (this.props.coupon.offer.redeem_month < current_month && this.props.coupon.status !== 'Redeemed' && this.props.coupon.status !== 'Active Now'){
      this.setState({
        current_status: "upcoming"
      },() => this.patchStatus(this.state.current_status))
    }
    else if (this.props.coupon.offer.redeem_month > current_month){
      this.setState({
        current_status: "expired"
      },() => this.patchStatus(this.state.current_status && this.props.coupon.status !== 'Redeemed' && this.props.coupon.status !== 'Active Now'))
    }
    else if (this.props.coupon.status === 'Redeemed'){
      this.setState({
        current_status: 'Redeemed'
      },() => this.patchStatus(this.state.current_status))
    }
    else if (this.props.coupon.status === 'Active Now'){
      this.setState({
        current_status: 'Active Now'
      },() => this.patchStatus(this.state.current_status))
    }
  }

  sendText = (checkInRest) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
     const data = {
       date: today,
       offer: this.props.coupon.offer.offer,
       rest: checkInRest.name,
       phoneNumber: this.props.current_user.phone,
     }
     fetch("http://localhost:3000/api/v1/text", {
         method: "POST",
         headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
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
      .then(res => {
        this.props.dispatch({ type: "UPDATE_COUPONS", payload: res })
      })
    }

  openState = () => {
    this.setState({
      open: true
    })
  }

  activateCoupon = () => {
      this.close()
      var d = new Date();
      let text = `Active Now:    ${d}`
      let t = setInterval(() => {
      var z = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      this.sendText(this.state.currentRestaurant)
      this.patchStatus('Active Now')
      this.setState({
        couponColor: z,
        buttonText: text,
        current_status: 'Active Now'
      })
      }, 200);
      setTimeout(() => {
        clearInterval(t);
        this.patchStatus('Redeemed')
        this.setState({
          current_status: 'Redeemed'
        })
      }, 10000)
    }

  confirmActivation = () => {
    if (this.state.open === true) {
    return (
    <Fragment>
    <Modal size={'tiny'} open={this.state.open} onClose={this.close}>
    <Modal.Header>Are you sure you want to activate?</Modal.Header>
    <Modal.Content>
    <p>A coupon for {this.state.currentRestaurant.name} will expire in 5 hours if you activate now. </p>
    </Modal.Content>
    <Modal.Actions>
    <Button onClick={()=>this.close()}negative icon='checkmark' labelPosition='right' content='Cancel' />
    <Button onClick={()=>this.activateCoupon()}positive icon='checkmark' labelPosition='right' content='Confirm' />
    </Modal.Actions>
    </Modal>
    </Fragment>
  )
}
else {
  return null
}
  }

renderCoupon = () => {
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
  if (this.state.current_status === "inactive") {
    return (
      <Card color='green' style={{backgroundColor: 'rgb(229, 239, 201)'}}>
      <Card.Content>
        <Card.Header>{this.props.coupon.offer.offer}</Card.Header>
        <Card.Meta>{this.state.currentRestaurant.name}</Card.Meta>
        <Card.Meta>{this.state.currentRestaurant.address1, this.state.currentRestaurant.city, this.state.currentRestaurant.zip_code} </Card.Meta>
        <Card.Description>Earned In: {month[this.props.coupon.offer.earn_month]}</Card.Description>
        <Card.Description>Redeemable: {month[this.props.coupon.offer.redeem_month]}</Card.Description>
        <Card.Description>Coupon ID:{this.props.coupon.id}</Card.Description>
        <Card.Content extra>
        Status: {this.state.current_status}
        <Button fluid style={{backgroundColor: 'green' }} onClick={()=> this.openState()}>
        {this.state.buttonText}
        </Button>
        </Card.Content>
        </Card.Content>
        </Card>
    )} else if (this.state.current_status === "upcoming") {
    return (
      <Card color='yellow' style={{backgroundColor: 'rgb(229, 239, 201)', width:'1000px;'}}>
      <Card.Content>
        <Card.Header>{this.props.coupon.offer.offer}</Card.Header>
        <Card.Meta>{this.state.currentRestaurant.name}</Card.Meta>
        <Card.Meta>{this.state.currentRestaurant.address1, this.state.currentRestaurant.city, this.state.currentRestaurant.zip_code} </Card.Meta>
        <Card.Description>Earned In: {month[this.props.coupon.offer.earn_month]}</Card.Description>
        <Card.Description>Redeemable: {month[this.props.coupon.offer.redeem_month]}</Card.Description>
        <Card.Content extra style={{marginLeft: '800px;'}}>
        <Card.Header> Status: {this.state.current_status} </Card.Header>
        <Card.Description>Coupon ID:{this.props.coupon.id}</Card.Description>
        </Card.Content>
        </Card.Content>
        </Card>
      )
      } else if (this.state.current_status === 'Active Now') {
        return (
          <Card color='green' style={{backgroundColor: 'rgb(229, 239, 201)', width: '1000px;'}}>
          <Card.Content>
            <Card.Header>{this.props.coupon.offer.offer}</Card.Header>
            <Card.Meta>{this.state.currentRestaurant.name}</Card.Meta>
            <Card.Meta>{this.state.currentRestaurant.address1, this.state.currentRestaurant.city, this.state.currentRestaurant.zip_code} </Card.Meta>
            <Card.Description>Earned In: {month[this.props.coupon.offer.earn_month]}</Card.Description>
            <Card.Description>Redeemable: {month[this.props.coupon.offer.redeem_month]}</Card.Description>
            <Card.Description>Coupon ID:{this.props.coupon.id}</Card.Description>
            <Card.Content extra>
            Status: {this.state.current_status}
            <Button fluid style={{backgroundColor: this.state.couponColor }} onClick={()=> this.openState()}>
            {this.state.buttonText}
            </Button>
            </Card.Content>
            </Card.Content>
            </Card>
    )} else if (this.state.current_status === "expired" ) {
    return (
      <Card color='gray' style={{backgroundColor: 'rgb(224, 224, 224)', width: '1000px;'}}>
      <Card.Content>
        <Card.Header>{this.props.coupon.offer.offer}</Card.Header>
        <Card.Meta>{this.state.currentRestaurant.name}</Card.Meta>
        <Card.Meta>{this.state.currentRestaurant.address1, this.state.currentRestaurant.city, this.state.currentRestaurant.zip_code} </Card.Meta>
        <Card.Description>Earned In: {month[this.props.coupon.offer.earn_month]}</Card.Description>
        <Card.Description>Redeemable: {month[this.props.coupon.offer.redeem_month]}</Card.Description>
        <Card.Description>Coupon ID:{this.props.coupon.id}</Card.Description>
        <Card.Content extra>
        <Card.Header style={{marginLeft: '800px;'}}> Status: {this.state.current_status} </Card.Header>
        </Card.Content>
        </Card.Content>
        </Card>
)} else if (this.state.current_status === 'Redeemed' ) {
      return (
        <Card color='gray' style={{backgroundColor: 'rgb(221, 234, 255)', width: '1000px;'}}>
        <Card.Content>
          <Card.Header>{this.props.coupon.offer.offer}</Card.Header>
          <Card.Meta>{this.state.currentRestaurant.name}</Card.Meta>
          <Card.Meta>{this.state.currentRestaurant.address1, this.state.currentRestaurant.city, this.state.currentRestaurant.zip_code} </Card.Meta>
          <Card.Description>Earned In: {month[this.props.coupon.offer.earn_month]}</Card.Description>
          <Card.Description>Redeemable: {month[this.props.coupon.offer.redeem_month]}</Card.Description>
          <Card.Description>Coupon ID:{this.props.coupon.id}</Card.Description>
          <Card.Content extra>
          <Card.Header style={{marginLeft: '800px;'}}> Status: {this.state.current_status} </Card.Header>
          </Card.Content>
          </Card.Content>
          </Card>
      )
}
}

  render() {
    return (
      <Fragment>
      <Card.Group itemsPerRow={2} centered>
      {this.renderCoupon()}
      </Card.Group>
      {this.confirmActivation()}
      </Fragment>
    )
  }

}
  export default connect(mapStateToProps)(CouponCard);


  function mapStateToProps(state) {
    return {
      keyword: state.keyword,
      current_user: state.current_user,
      allRestaurants: state.allRestaurants,
      user_type: state.user_type,
      allOffers: state.allOffers,
      allCoupons: state.allCoupons
    }

    console.log("here", state.keyword)
  }
