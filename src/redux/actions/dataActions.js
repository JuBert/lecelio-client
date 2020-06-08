import {
  SET_WINES,
  LOADING_DATA,
  LIKE_WINE,
  UNLIKE_WINE,
  DELETE_WINE,
} from '../types';
import axios from 'axios';

// Get all wines
export const getWines = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/getWines')
    .then((res) => {
      dispatch({
        type: SET_WINES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_WINES,
        payload: [],
      });
    });
};

// Like a wine
export const likeWine = (wineId) => (dispatch) => {
  axios
    .get(`/wine/${wineId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_WINE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a wine
export const unlikeWine = (wineId) => (dispatch) => {
  axios
    .get(`/wine/${wineId}/unLike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_WINE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteWine = (wineId) => (dispatch) => {
  axios
    .delete(`/wine/${wineId}`)
    .then(() => {
      dispatch({ type: DELETE_WINE, payload: wineId });
    })
    .catch((err) => console.log(err));
};
