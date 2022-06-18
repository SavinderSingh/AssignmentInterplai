import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunk from 'redux-thunk';
import actionTypes from './actions/actionTypes';
import homeReducer from './reducers/homeReducer';


const appReducer = combineReducers({
    home : homeReducer,
})


const rootReducer = (state,action) => {
  if (action.type === actionTypes.LOGOUT) {
    state = undefined
  }

  return appReducer(state,action)
}


let middleware = [thunk];

if (__DEV__) {
//   const reduxImmutableStateInvariant = require("redux-immutable-state-invariant").default();
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}



const configStore = createStore(rootReducer,applyMiddleware(...middleware))

export default configStore;