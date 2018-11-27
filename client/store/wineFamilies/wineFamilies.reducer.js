import { combineReducers } from 'redux';

import { SET_WINE_FAMILIES } from './wineFamilies.types';

export const allReducer = (state = [], action) => {
  switch (action.type) {
    case SET_WINE_FAMILIES: {
      const { wineFamilies } = action.payload;

      return wineFamilies;
    }

    default:
      return state;
  }
};

export const mapReducer = (state = [], action) => {
  switch (action.type) {
    case SET_WINE_FAMILIES: {
      const { wineFamilies } = action.payload;

      return wineFamilies.reduce((acc, wineFamily) => {
        acc[wineFamily.id] = wineFamily;
        return acc;
      }, {});
    }

    default:
      return state;
  }
};

const reducer = combineReducers({
  map: mapReducer,
  all: allReducer
});

export default reducer;
