import {
  SET_WINES,
  SET_WINE,
  LIKE_WINE,
  UNLIKE_WINE,
  LOADING_DATA,
  DELETE_WINE,
  POST_WINE,
  POST_WINEPIC,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  wines: [],
  wine: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_WINES:
      return {
        ...state,
        wines: action.payload,
        loading: false,
      };
    case SET_WINE:
      return {
        ...state,
        wine: action.payload,
      };
    case LIKE_WINE:
    case UNLIKE_WINE:
      let index = state.wines.findIndex(
        (wine) => wine.wineId === action.payload.wineId
      );
      state.wines[index] = action.payload;
      if (state.wine.wineId === action.payload.wineId) {
        state.wine = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_WINE:
      index = state.wines.findIndex((wine) => wine.wineId === action.payload);
      state.wines.splice(index, 1);
      return {
        ...state,
      };
    case POST_WINE:
      return {
        ...state,
        wine: [action.payload, ...state.wine],
      };
    case POST_WINEPIC:
      console.log('WINEPIC UPLOADED' + JSON.stringify(action));
      return {
        ...state,
        wines: [action.payload, ...state.wines],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        wine: {
          ...state.wine,
          comments: [action.payload, ...state.wine.comments],
        },
      };
    default:
      return state;
  }
}
