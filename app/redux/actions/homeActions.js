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

export const setCurrentTab = tab => {
  return async dispatch => {
    dispatch({
      type: actionTypes.TAB,
      currentTab: tab,
    });
  };
};

export const getEntriesList = page =>
  new Promise((resolve, reject) => {
    AxiosBase.get(apis.ENTRIES)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
