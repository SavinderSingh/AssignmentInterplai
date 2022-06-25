import actionTypes from '../actions/actionTypes';

let initialState = {
  entriesList: [],
};

export default homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ENTRIES:
      return {
        ...state,
        entriesList: action.entriesList,
      };
  }
  return state;
};
