import {
  SET_FILTER,
  TOGGLE_CHECKBOX_FILTER,
  UPDATE_INPUT_FILTER
} from './search.types';

export default (
  state = {
    wineFamilies: [],
    wineTypes: [],
    wineCategories: [],
    period: []
  },
  action
) => {
  switch (action.type) {
    case SET_FILTER: {
      return { ...state };
    }
    case TOGGLE_CHECKBOX_FILTER: {
      const { key, value } = action;
      let newFilters;
      if (state[key].includes(value)) {
        newFilters = state[key].filter(item => item !== value);
      } else {
        newFilters = [...state[key], value];
      }
      return { ...state, [key]: newFilters };
    }
    case UPDATE_INPUT_FILTER: {
      const { key, value } = action;
      let valueFormated = value;
      if (['minYear', 'maxYear'].includes(key)) {
        valueFormated = parseInt(value, 10);
      }
      return { ...state, [key]: valueFormated };
    }

    default:
      return state;
  }
};
