function nameMatch(filter, name) {
  return name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
}

function hasFiltersSet(filters) {
  let has = false;
  has = ['wineFamilies', 'wineTypes', 'wineCategories'].some(
    key => filters[key].length > 0
  );
  return (
    has ||
    !!filters.minYear ||
    !!filters.maxYear ||
    !!filters.name ||
    filters.favorites
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

export const getWinesFiltered = (state, filters) => {
  return state.all.filter(wineId => isWineMatch(state, filters, wineId));
};
export const isWineFiltered = (state, selectedWines, wineId) => {
  const index = selectedWines.indexOf(wineId);
  return index > -1 && index < state.hitsDisplayed;
};