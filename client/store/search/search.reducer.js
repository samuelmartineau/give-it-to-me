import {
  SET_FILTER,
  TOGGLE_CHECKBOX_FILTER,
  UPDATE_INPUT_FILTER,
  GET_NEXT_HITS
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
    hitsDisplayed: hitsByPage
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
    case GET_NEXT_HITS: {
      return { ...state, hitsDisplayed: state.hitsDisplayed + hitsByPage };
    }

    default:
      return state;
  }
};

function nameMatch(filter, name) {
  return name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
}

function hasFiltersSet(filters) {
  let has = false;
  has = ['wineFamilies', 'wineTypes', 'wineCategories'].some(
    key => filters[key].length > 0
  );
  return has || !!filters.minYear || !!filters.maxYear || !!filters.name;
}

export const getWinesFiltered = (state, filters) => {
  return state.all.filter(wineId => isWineMatch(state, filters, wineId));
};
export const isWineFiltered = (state, selectedWines, wineId) => {
  const index = selectedWines.indexOf(wineId);
  return index > -1 && index < state.hitsDisplayed;
};

const isWineMatch = (state, filters, wineId) => {
  const filtersSet = hasFiltersSet(filters);
  if (!filtersSet) {
    return true;
  }
  const wine = state.map[wineId];
  if (
    filters.wineCategories.length &&
    !filters.wineCategories.includes(wine.wineCategory)
  ) {
    return false;
  }
  if (filters.wineTypes.length && !filters.wineTypes.includes(wine.wineType)) {
    return false;
  }
  if (filters.minYear && wine.year < filters.minYear) {
    return false;
  }
  if (filters.maxYear && wine.year > filters.maxYear) {
    return false;
  }
  if (filters.name && !nameMatch(filters.name, wine.name)) {
    return false;
  }
  return true;
};
