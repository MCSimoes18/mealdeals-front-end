import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, Segment, Button, Fixed } from 'semantic-ui-react'
import { connect } from 'react-redux';
import MonthlyOffers from './MonthlyOffers'

const colors = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
]

class NavBar extends Component {

  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name, color: 'yellow'} )

  logout = () => {
    localStorage.clear()
    this.props.dispatch({ type: "LOGIN_USER", payload: null })
    this.props.dispatch({ type: "LOGIN_USER_TYPE", payload: null })
    this.setState({
      current_user: null
    })
  }


  handleNavBar = () => {
    const { activeItem } = this.state
    const { color } = this.props
    if (this.props.user_type === 'user') {
      return (
      <Segment inverted>
          <Menu inverted pointing secondary >

            <NavLink to="/">
              <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
            </NavLink>

            <NavLink to="/MonthlyOffers">
              <Menu.Item name='Restaurants of the Month' active={activeItem === 'Restaurants of the Month'} onClick={this.handleItemClick} />
            </NavLink>

            <Menu.Item position='right'>
            <NavLink to="/UserProfile">
              <Button as='a' >
                My Account
              </Button>
            </NavLink>
            <NavLink to="/">
              <Button onClick={() => this.logout()}as='a' style={{ marginLeft: '0.5em' }}>
                Sign Out
              </Button>
            </NavLink>
            </Menu.Item>
      </Menu>
        </Segment>
      )

    }
    else if (this.props.user_type === 'restaurant') {

      return (
      <Segment inverted>
          <Menu inverted pointing secondary >
            <NavLink to="/">
              <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
            </NavLink>

            <Menu.Item position='right'>
            <NavLink to="/RestaurantHome">
              <Button as='a' >
                My Account
              </Button>
            </NavLink>
            <NavLink to="/">
              <Button onClick={() => this.logout()}as='a' style={{ marginLeft: '0.5em' }}>
                Sign Out
              </Button>
            </NavLink>
            </Menu.Item>


          </Menu>
        </Segment>
      )

    }
    else if (this.props.user_type === null || this.props.user_type === 'before_restaurant') {
      return (
        <Segment inverted style={{paddingBottom: '0px;'}}>
          <Menu inverted pointing secondary >
            <NavLink to="/">
              <Menu.Item name='home'
              active={activeItem === 'home'} onClick={this.handleItemClick} />
            </NavLink>

            <NavLink to="/GoogleMap">
              <Menu.Item name='Restaurants of the Month' active={activeItem === 'Restaurants of the Month'} onClick={this.handleItemClick} />
            </NavLink>

            <Menu.Item position='right'>
            <NavLink to="/Login">
              <Button as='a' >
                Log in
              </Button>
            </NavLink>
            <NavLink to="/SignUp">
              <Button as='a' style={{ marginLeft: '0.5em' }}>
                Sign Up
              </Button>
            </NavLink>
            </Menu.Item>
          </Menu>
        </Segment>
      )
    }
  }

  render () {
    return (
      <Fragment>
      {this.handleNavBar()}
      </Fragment>
      );
    }
  };

  export default connect(mapStateToProps)(NavBar)


  function mapStateToProps(state) {
    return {
      current_user: state.current_user,
      user_type: state.user_type
    }
  }
