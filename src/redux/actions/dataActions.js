import {
  SET_WINES,
  LOADING_DATA,
  LIKE_WINE,
  UNLIKE_WINE,
  DELETE_WINE,
  LOADING_UI,
  POST_WINE,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_WINE,
  STOP_LOADING_UI,
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
// Get one Bottle
export const getWine = (wineId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/wine/${wineId}`)
    .then((res) => {
      dispatch({
        type: SET_WINE,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// Post a wine
export const postWine = (newWine) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/postWine', newWine)
    .then((res) => {
      dispatch({
        type: POST_WINE,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
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

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
