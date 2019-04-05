const initialState = {
  location: "",
  cuisine: "",
  current_user: null
}

function reducer(state = initialState, action, payload) {
  console.log('%c reducer:', 'color: orange', state, action);
  switch (action.type) {
    case "SEARCH_LOC":
      return {...state, location: action.payload }
    case "SEARCH_CUISINE":
      return {...state, cuisine: action.payload }
    case "LOGIN_USER":
      console.log("testing reducer", action.payload)
      return {...state, current_user: action.payload }
    default:
      console.log('default case', state);
      return state;
    }
  }


export default reducer;
