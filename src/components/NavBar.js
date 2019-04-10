import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'

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

  render () {
    const { activeItem } = this.state
    const { color } = this.props
    return (
      <Segment inverted>
              <Menu inverted pointing secondary >
                <NavLink to="/">
                  <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                </NavLink>
                <NavLink to="/MonthlyOffers">
                  <Menu.Item name='Restaurants of the Month' active={activeItem === 'Restaurants of the Month'} onClick={this.handleItemClick} />
                </NavLink>
                <NavLink to="/Login">
                  <Menu.Item name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick} />
                </NavLink>
                <NavLink to="/RestaurantLogin">
                  <Menu.Item name='I am a Restaurant' active={activeItem === "I am a Restaurant"} onClick={this.handleItemClick} />
                </NavLink>
              </Menu>
            </Segment>
      );
    }
  };

export default NavBar;

// <div className="navbar">
// <NavLink to="/"> Home </NavLink>
// <NavLink to="/MonthlyOffers"> Restaurants of the Month </NavLink>
// <NavLink to="/Login"> Login </NavLink>
// </div>
