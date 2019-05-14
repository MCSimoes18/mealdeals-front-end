const initialState = {
  location: "",
  cuisine: "",
  current_user: null,
  user_type: null,
  allRestaurants: [],
  rests: null,
  allOffers: [],
  allCoupons: [],
  allUsers: [],
  newCoupon: null,
  selectedCity: 'All Cities',
  selectedCoupon: 'All Coupons',
  newOffer: null
}

function reducer(state = initialState, action, payload) {
  switch (action.type) {
    case "SEARCH_LOC":
      return {...state, location: action.payload }
    case "SEARCH_CUISINE":
      return {...state, cuisine: action.payload }
    case "SEARCH_RESULTS":
      console.log("testing results", action.payload)
      return {...state, rests: action.payload }
    case "LOGIN_USER":
      console.log("testing reducer1", action.payload)
      return {...state, current_user: action.payload }
    case "LOGIN_USER_TYPE":
      console.log("testing reducer2", action.payload)
      return {...state, user_type: action.payload }
    case "SELECTED_CITY":
      console.log("testing reducer3", action.payload)
      return {...state, selectedCity: action.payload }
    case "SELECTED_COUPON":
      console.log("testing reducer4", action.payload)
      return {...state, selectedCoupon: action.payload }
    case "ALL_RESTAURANTS":
      return {...state, allRestaurants: action.payload }
    case "ALL_OFFERS":
      return {...state, allOffers: action.payload }
    case "NEW_OFFER":
      console.log("new offer..", action.payload)
      return {...state, newOffer: action.payload }
    case "ADD_OFFER":
      console.log("adding offer..", action.payload)
      return { ...state, allOffers: [...state.allOffers, action.payload] }
    case "ALL_COUPONS":
      return {...state, allCoupons: action.payload }
    case "ALL_USERS":
      return {...state, allUsers: action.payload }
    case "NEW_COUPON":
      return {...state, newCoupon: action.payload }
    case "ADD_COUPON":
      return { ...state, allCoupons: [...state.allCoupons, action.payload] }
    default:
      console.log('default case', state);
      return state;
    }
  }


export default reducer;
