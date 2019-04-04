const initialState = {
  keyword: ""
}

function reducer(state = initialState, action, payload) {
  console.log('%c reducer:', 'color: orange', state, action);
  switch (action.type) {
    case "SEARCH":
      return {...state, keyword: action.payload }
      debugger
    default:
      console.log('default case', state);
      return state;
    }
  }


export default reducer;
