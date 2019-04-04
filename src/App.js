import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
/////// IMPORT COMPONENTS ////////
import NavBar from './components/NavBar';
// import $ from "jquery";

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





//
//   // var cors_anywhere_url = 'https://cors-anywhere.herokuapp.com/';
//   // var yelp_search_url = cors_anywhere_url + "https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco";
//
// getYelp = () => {
//   fetch(`https://cors-anywhere.herokuapp.com/${`https://api.yelp.com/v3/businesses/north-india-restaurant-san-francisco`}`)
//   .then(res => res.json())
//   .then(console.log())
// }
//   // function mycallbackfunc(info){
// 	// 	console.log(info);// do whatever you want with your info in the browser here
// 	// }
//
//   // function seek(search_url,inputs,mycallbackfunc) {
//   // 		var xhr = new XMLHttpRequest();
//   // 		xhr.open('GET', search_url, true);
//   // 		// bearer token is evaluated and sent off immediately in our query request to Yelp
//   // 		xhr.setRequestHeader("Authorization", "Bearer " + "8ESWJF5yfJ2HIjpxhoXJVnZ9CuXnQHtLMIlSgVwsGu1-Sr5VWaDhSThfTM6riZ-HbnTY_xjp8vbPk7wKEgwlSrpmTMFjzrwV9jy1X0CjQzzd-8AYhAbqfTcYasmgXHYx" ));
//   // 	  	xhr.onreadystatechange = function() {
//   // 		   if (xhr.readyState == 4 && xhr.status == 200) {
//   // 	             mycallbackfunc(xhr.responseText);
//   // 	           }
//   // 	  	};
//   // 		xhr.send();
//   // 	}
//
