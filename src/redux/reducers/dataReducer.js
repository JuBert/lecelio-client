import {
  SET_WINES,
  LIKE_WINE,
  UNLIKE_WINE,
  LOADING_DATA,
  DELETE_WINE,
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
    default:
      return state;
  }
}
