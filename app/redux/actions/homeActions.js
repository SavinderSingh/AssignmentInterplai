import apis from '../networkRequest/APIs';
import AxiosBase from '../networkRequest/AxiosBase';
import actionTypes from './actionTypes';

export const setEntriesList = list => {
  return async dispatch => {
    dispatch({
      type: actionTypes.ENTRIES,
      entriesList: list,
    });
  };
};
