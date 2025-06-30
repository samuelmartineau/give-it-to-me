import { combineReducers } from 'redux';

import { SET_WINE_FAMILIES, SET_WINE_FAMILY } from './wineFamilies.types';
import { WineFamiliesActions } from './wineFamilies.actions';
import { WineFamilyType } from '~/client/Cellar.type';

type AllType = WineFamilyType[];

export const allReducer = (
  state: AllType = [],
  action: WineFamiliesActions
) => {
  switch (action.type) {
    case SET_WINE_FAMILIES: {
      const { wineFamilies } = action.payload;

      return wineFamilies;
    }
    case SET_WINE_FAMILY: {
      const { wineFamily } = action.payload;

      return [...state, wineFamily];
    }

    default:
      return state;
  }
};

type MapType = {
  [id: number]: WineFamilyType;
};

export const mapReducer = (
  state: MapType = {},
  action: WineFamiliesActions
) => {
  switch (action.type) {
    case SET_WINE_FAMILIES: {
      const { wineFamilies } = action.payload;

      return wineFamilies.reduce((acc, wineFamily) => {
        acc[wineFamily.id] = wineFamily;
        return acc;
      }, {});
    }
    case SET_WINE_FAMILY: {
      const { wineFamily } = action.payload;

      return {
        ...state,
        [wineFamily.id]: wineFamily,
      };
    }

    default:
      return state;
  }
};

const reducer = combineReducers({
  map: mapReducer,
  all: allReducer,
});

export default reducer;
