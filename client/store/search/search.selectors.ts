import { ArrayKeys } from './utils';
import { State } from './search.reducer';

function nameMatch(filter, name) {
  return name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
}

function hasFiltersSet(filters) {
  let has = false;
  has = ['wineFamilies', 'wineTypes', 'wineCategories'].some(
    (key) => filters[key].length > 0
  );
  return (
    has ||
    !!filters.minYear ||
    !!filters.maxYear ||
    !!filters.name ||
    filters.favorites ||
    filters.outsideBoxes
  );
}

const isWineMatch = (state, filters, wineId) => {
  const filtersSet = hasFiltersSet(filters);
  if (!filtersSet) {
    return true;
  }
  const wine = state.map[wineId];
  if (filters.favorites && !wine.isFavorite) {
    return false;
  }
  if (filters.outsideBoxes && !!wine.isInBoxes) {
    return false;
  }
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
  if (
    filters.wineFamilies.length &&
    !filters.wineFamilies.includes(wine.wineFamily)
  ) {
    return false;
  }
  return true;
};

export const getWinesFiltered = (state, filters) => {
  return state.all.filter((wineId) => isWineMatch(state, filters, wineId));
};
export const isWineFiltered = (state, selectedWines, wineId) => {
  const index = selectedWines.indexOf(wineId);
  return index > -1 && index < state.hitsDisplayed;
};

export const getFiltersCount = (state: State) => {
  let count = ArrayKeys.reduce((acc, key) => {
    return acc + state[key].length;
  }, 0);
  if (state.minYear !== undefined && state.minYear !== null) {
    count += 1;
  }
  if (state.maxYear !== undefined && state.maxYear !== null) {
    count += 1;
  }
  if (state.favorites) {
    count += 1;
  }
  if (state.outsideBoxes) {
    count += 1;
  }
  if (state.name && state.name.length) {
    count += 1;
  }
  return count;
};
