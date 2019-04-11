import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import CouponCard from './CouponCard'
import UserLeftNav from './UserLeftNav'
import MonthlyOffers from './MonthlyOffers'
import { Form, Input, Divider, Button, Header, Icon, Label, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

class UserProfile extends Component {
  state = {
    allCoupons: [],
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
    fetch("http://localhost:3000/api/v1/restaurants")
    .then(res => res.json())
    .then(res => {
      this.props.dispatch({ type: "ALL_RESTAURANTS", payload: res })
    })
  }

  findUserCoupons = () => {
    let findUserCoupons = this.state.allCoupons.filter(coupon => coupon.user_id === this.props.current_user.id)
    this.setState({
      userCoupons: findUserCoupons
    }, () => console.log("here are my coupons", this.state.userCoupons))
  }

  renderContent = () => {
  if (this.state.displayContent === 'coupon') {
    return this.state.userCoupons.map(coupon => {
        return (
          <CouponCard
          coupon={coupon}
          />
        )
      })
    } else if (this.state.displayContent === 'food') {
      return (
        <MonthlyOffers />
      )
    } else if (this.state.displayContent === 'heart') {
      console.log("this will be something")
    }
    else if (this.state.displayContent === 'setting'){
      console.log("this will update user info")
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
           <Menu.Item as='a' className="navContent1" onClick={() => this.updateContent('coupon', 'Your Coupons')}>
             <img
             className="coupon"
             src={process.env.PUBLIC_URL + '/cutcoupon.png'}
             />
             My Coupons
           </Menu.Item >
           <Menu.Item as='a' className="navContent" onClick={() => this.updateContent('food', 'Restaurants of the Month')}>
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
             <Header as='h3'></Header>
             <h1> Welcome Back {this.props.current_user.name} ! </h1>
             <Divider />
             <h2> {this.state.displayHeader}</h2>
             <Divider />
             {this.renderContent()}
           </Segment>
         </Sidebar.Pusher>
       </Sidebar.Pushable>
      )
    }
  }

export default connect(mapStateToProps)(UserProfile)


function mapStateToProps(state) {
  return {
    current_user: state.current_user
  }
}
