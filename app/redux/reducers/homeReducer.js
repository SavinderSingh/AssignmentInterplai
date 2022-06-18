import {USER_ADMIN} from '../../values/strings';
import actionTypes from '../actions/actionTypes';

let initialState = {
  entriesList: [],
  currentTab: 'Dashboard',
};

export default homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ENTRIES:
      return {
        ...state,
        entriesList: action.entriesList,
      };
    case actionTypes.TAB:
      return {
        ...state,
        currentTab: action.currentTab,
      };
  }
  return state;
};
