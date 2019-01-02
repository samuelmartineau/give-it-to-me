import {
  TOGGLE_CHECKBOX_FILTER,
  UPDATE_INPUT_FILTER,
  GET_NEXT_HITS,
  TOGGLE_FAVORITES_FILTER,
  SYNC_URL_PARAMS,
  TOGGLE_OUTSIDE_BOXES_FILTER
} from './search.types';
import { ArrayKeys } from './utils';

const hitsByPage = 10;

const defaultState = {
  wineFamilies: [],
  wineTypes: [],
  wineCategories: [],
  minYear: undefined,
  maxYear: undefined,
  name: undefined,
  hitsDisplayed: hitsByPage,
  favorites: false,
  outsideBoxes: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_CHECKBOX_FILTER: {
      const { key, value } = action.payload;
      let newFilters;
      if (state[key].includes(value)) {
        newFilters = state[key].filter(item => item !== value);
      } else {
        newFilters = [...state[key], value];
      }
      return { ...state, [key]: newFilters };
    }
    case TOGGLE_FAVORITES_FILTER: {
      return { ...state, favorites: !state.favorites };
    }
    case TOGGLE_OUTSIDE_BOXES_FILTER: {
      return { ...state, outsideBoxes: !state.outsideBoxes };
    }
    case UPDATE_INPUT_FILTER: {
      const { key, value } = action.payload;
      let valueFormated = value;
      if (['minYear', 'maxYear'].includes(key)) {
        valueFormated = parseInt(value, 10);
      }
      return { ...state, [key]: valueFormated };
    }
    case GET_NEXT_HITS: {
      return { ...state, hitsDisplayed: state.hitsDisplayed + hitsByPage };
    }
    case SYNC_URL_PARAMS: {
      const { params } = action.payload;
      const newState = { ...defaultState };
      const booleansFilters = ['favorites', 'outsideBoxes'];
      booleansFilters.forEach(key => {
        if (key in params) {
          newState[key] = params[key];
        }
      });
      if (params.wineFamilies)
        Object.keys(params).forEach(key => {
          if (ArrayKeys.includes(key)) {
            newState[key] = newState[key].concat(params[key]);
            if (key === 'wineFamilies') {
              newState[key] = newState[key].map(id => parseInt(id, 10));
            }
          } else {
            newState[key] = params[key];
          }
        });
      return { ...newState };
    }

    default:
      return state;
  }
};
