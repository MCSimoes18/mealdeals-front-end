import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
/////// IMPORT COMPONENTS ////////
import NavBar from './components/NavBar';
// import $ from "jquery";
import './App.css';

export default class App extends React.Component {
  state = {
    restaurants: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/restaurants')
    .then(res=>res.json())
    .then(console.log)
    // .then(rest => {
    //   this.setState({ restaurants: rest})
    // }, () => console.log(this.state.restaurants))
  }

render () {
    return (
      <div>
        <NavBar restaurants={this.state.restaurants}/>
      </div>
    );
  }
};
