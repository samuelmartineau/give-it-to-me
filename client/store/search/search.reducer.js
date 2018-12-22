import {
  TOGGLE_CHECKBOX_FILTER,
  UPDATE_INPUT_FILTER,
  GET_NEXT_HITS,
  TOGGLE_FAVORITES_FILTER
} from './search.types';

const hitsByPage = 10;

export default (
  state = {
    wineFamilies: [],
    wineTypes: [],
    wineCategories: [],
    minYear: undefined,
    maxYear: undefined,
    name: undefined,
    hitsDisplayed: hitsByPage,
    favorites: false
  },
  action
) => {
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

    default:
      return state;
  }
};
