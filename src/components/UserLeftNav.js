// import React, { Component, Fragment } from 'react'
// import { connect } from 'react-redux';
// import CouponCard from './CouponCard'
// import { Responsive, Container, Form, Input, Button, Header, Icon, Label, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
//
// class UserLeftNav extends Component {
//   state = {
//     activeItem: 'inbox'
//   }
//
//
//
  // render() {
  //   const { activeItem } = this.state
  //  return (
  //    <Sidebar.Pushable as={Segment}>
  //      <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin'>
  //        <Menu.Item as='a' className="nac">
  //          <Icon name='home' />
  //          Home
  //        </Menu.Item>
  //        <Menu.Item as='a'>
  //          <Icon name='gamepad' />
  //          Games
  //        </Menu.Item>
  //        <Menu.Item as='a'>
  //          <Icon name='camera' />
  //          Channels
  //        </Menu.Item>
  //      </Sidebar>
  //
  //      <Sidebar.Pusher>
  //        <Segment basic>
  //          <Header as='h3'>Application Content</Header>
  //          <h1> {this.props.current_user.name} </h1>
  //          {this.renderUserCoupons()}
  //        </Segment>
  //      </Sidebar.Pusher>
  //    </Sidebar.Pushable>
  //  )
  //   }
  // }
//
// export default connect(mapStateToProps)(UserLeftNav)
//
//
// function mapStateToProps(state) {
//   return {
//     current_user: state.current_user
//   }
// }
