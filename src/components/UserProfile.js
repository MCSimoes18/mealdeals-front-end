import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import CouponCard from './CouponCard'
import MonthlyOffers from './MonthlyOffers'
import { Card, Container, Form, Input, Divider, Button, Header, Icon, Label, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

class UserProfile extends Component {

  static defaultProps = { // <-- DEFAULT PROPS
      userCoupons: []      // undefined gets converted to array,render won't trigger error
  }

  state = {
    // allCoupons: [],
    userCoupons: [],
    activeItem: 'home',
    animation: 'push',
    direction: 'left',
    dimmed: false,
    visible: false,
    displayContent: 'coupon',
    displayHeader: 'Your Coupons'
  }



  updateContent = (content, header) => {
    this.setState({
      displayContent: content,
      displayHeader: header
    })
    fetch("http://localhost:3000/api/v1/coupon_users")
    .then(res => res.json())
    .then(res => {
      let findUserCoupons = res.filter(coupon => coupon.user_id === this.props.current_user.id)
      this.setState({
        userCoupons: findUserCoupons
      })
    })
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
  }
    // })
  //   fetch("http://localhost:3000/api/v1/restaurants")
  //   .then(res => res.json())
  //   .then(res => {
  //     this.props.dispatch({ type: "ALL_RESTAURANTS", payload: res })
  //   })

  // findUserCoupons = () => {
  //   let findUserCoupons = this.props.allCoupons.filter(coupon => coupon.user_id === this.props.current_user.id)
  //   this.setState({
  //     userCoupons: findUserCoupons
  //   }, () => console.log("here are my coupons", this.state.userCoupons))
  // }

  renderContent = () => {
  if (this.state.displayContent === 'coupon') {
    if (this.state.userCoupons.length === 0){
      return (
        <Fragment>
        <h1> You do not have any coupons </h1>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        </Fragment>
      )
    } else {
      return this.state.userCoupons.map(coupon => {
        return (
          <CouponCard
          coupon= {coupon}
          />
        )
      })
    }
    } else if (this.state.displayContent === 'food') {
      return (
        <MonthlyOffers />
      )
    } else if (this.state.displayContent === 'heart') {
      return (
        <Fragment>
        <h1> This Feature is Not Yet Available </h1>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        </Fragment>
      )
    }
    else if (this.state.displayContent === 'setting'){
      return (
        <Fragment>
        <h1> You do not have any coupons </h1>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        </Fragment>
      )
    }
 }

  // next step is to create coupon cards and iterate through them
  render() {
    const { activeItem } = this.state
    const { animation, dimmed, direction, visible } = this.state
    const vertical = direction === 'bottom' || direction === 'top'
     return (
       <Sidebar.Pushable as={Segment} className="sideNav">
         <Sidebar as={Menu} animation='push' icon='labeled' vertical visible width='thin'>
           <Menu.Item as='a' className="navContent1" onClick={() => this.updateContent('coupon', 'YOUR COUPONS')}>
             <img
             className="coupon"
             src={process.env.PUBLIC_URL + '/cutcoupon.png'}
             />
             My Coupons
           </Menu.Item >
           <Menu.Item as='a' className="navContent" onClick={() => this.updateContent('food', 'RESTAURANTS OF THE MONTH')}>
             <Icon name='food' />
             Restaurants of the Month
           </Menu.Item>
           <Menu.Item as='a' className="navContent" onClick={() => this.updateContent('heart')}>
             <Icon name='heart' />
             My Restaurants
           </Menu.Item>
           <Menu.Item as='a' className="navContent" onClick={() => this.updateContent('setting')}>
             <Icon name='setting' />
             Settings
           </Menu.Item>
         </Sidebar>
         <Sidebar.Pusher>
           <Segment basic dimmed={dimmed && visible}>
             <h2> Welcome Back {this.props.current_user.name} ! </h2>
             <Divider />
             <h2> {this.state.displayHeader}</h2>
             <Divider />
             <div className="userContainer">
             <Container>
             {this.renderContent()}
             </Container>
             </div>
           </Segment>
         </Sidebar.Pusher>
       </Sidebar.Pushable>
      )
    }
  }

export default connect(mapStateToProps)(UserProfile)


function mapStateToProps(state) {
  return {
    current_user: state.current_user,
    user_type: state.user_type,
    allRestaurants: state.allRestaurants,
    allOffers: state.allOffers,
    allCoupons: state.allCoupons,
    newCoupon: state.newCoupon
  }
}
