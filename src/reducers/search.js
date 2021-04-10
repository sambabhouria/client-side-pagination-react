import * as Types from "../constants/ActionTypes";

var initialState = "";

var search = (state = initialState, action) => {
  console.log('action', action)
  switch (action.type) {
    case Types.SEARCH:
      return action.keyword;

    default:
      return state;
  }
};

export default search;
