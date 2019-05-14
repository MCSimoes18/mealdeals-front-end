import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

console.log('%c Initial State:', 'color: blue', store.getState());

console.log("%c ====================================", 'color: green');


export default store;
