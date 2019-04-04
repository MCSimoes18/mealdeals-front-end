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
import store from './store';


ReactDOM.render((
  <Provider store={store}>
    <Router>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/MonthlyOffers" component={MonthlyOffers} />
    </Router>
  </Provider>
),
  document.getElementById('root')
);


serviceWorker.unregister();