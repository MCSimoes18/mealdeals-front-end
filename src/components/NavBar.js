import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  return (
    <div className="navbar">
      <NavLink to="/"> Home </NavLink>
      <NavLink to="/MonthlyOffers" restaurants={props.restaurants}> Restaurants of the Month </NavLink>
    </div>
  );
};

export default NavBar;
