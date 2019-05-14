import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
// Redux //
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// Import Components //
import App from './App';
import Home from './components/Home';
import NavBar from './components/NavBar';
import MonthlyOffers from './components/MonthlyOffers';
import Login from './components/Login';
import SignUp from './components/SignUp';
import RestaurantSignUp from './components/RestaurantSignUp';
import RestaurantLogin from './components/RestaurantLogin';
import RestaurantHome from './components/RestaurantHome';
import UserProfile from './components/UserProfile';
import Search from './components/Search';
import SearchWithMap from './components/SearchWithMap';
import GoogleMap from './components/GoogleMap';
import store from './store';


ReactDOM.render((
  <Provider store={store}>
      <App />
  </Provider>
),
  document.getElementById('root')
);


serviceWorker.unregister();
