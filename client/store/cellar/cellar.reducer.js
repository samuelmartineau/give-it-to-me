import { combineReducers } from 'redux';
import { CELLAR_RECEIVED } from './cellar.types';

export const mapReducer = (state = {}, action) => {
  switch (action.type) {
    case CELLAR_RECEIVED:
      return action.cellar.reduce(
        (acc, wine) =>
          Object.assign(acc, {
            [wine.id]: {
              ...wine,
              bottles: wine.bottles.map(bottle => bottle.id)
            }
          }),
        {}
      );
    default:
      return state;
  }
};
export const getWineById = (state, id) => state[id];

export const getWinesFiltered = (state, filters) =>
  state.all
    .map(id => state.map[id])
    .filter(wine => {
      if (
        filters.wineCategories.length &&
        !filters.wineCategories.includes(wine.wineCategory)
      ) {
        return false;
      }
      if (
        filters.wineTypes.length &&
        !filters.wineTypes.includes(wine.wineType)
      ) {
        return false;
      }
      return true;
    })
    .map(p => p.id);

export const allReducer = (state = [], action) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      return action.cellar.map(wine => wine.id);
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
