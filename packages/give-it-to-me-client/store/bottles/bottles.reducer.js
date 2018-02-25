import { combineReducers } from 'redux';
import { CELLAR_RECEIVED } from '../cellar/cellar.types';
import { wineTypes } from 'give-it-to-me-config';

function getBottles(wines) {
  return wines.reduce(
    (acc, wine) =>
      acc.concat(
        wine.bottles.map(bottle => ({
          ...bottle,
          color: wineTypes.WINE_TYPES[wine.wineType].color
        }))
      ),
    []
  );
}

export const mapReducer = (state = {}, action) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      return getBottles(action.cellar).reduce(
        (acc, bottle) =>
          Object.assign(acc, {
            [bottle.id]: bottle
          }),
        {}
      );
    }
    default:
      return state;
  }
};
export const allReducer = (state = [], action) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      return getBottles(action.cellar);
    }
    default:
      return state;
  }
};

export const cellsReducer = (state = {}, action) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      return getBottles(action.cellar).reduce((acc, bottle) => {
        if (!acc[bottle.box]) {
          acc[bottle.box] = {};
        }
        Object.assign(acc[bottle.box], {
          ...acc[bottle.box],
          [bottle.cell]: bottle
        });
        return acc;
      }, {});
    }
    default:
      return state;
  }
};

export const getCellsUsedInBox = (state, boxId) => {
  return state[boxId] ? Object.keys(state[boxId]) : [];
};

export const getBottleById = (state, boxId) => {
  return state[boxId];
};

export const getBottlesInBox = (state, boxId) => state[boxId] || [];

export const getBottleByPosition = (state, boxId, cellId) => {
  if (state[boxId] && state[boxId][cellId]) {
    return state[boxId][cellId];
  }
  return null;
};

const reducer = combineReducers({
  map: mapReducer,
  cells: cellsReducer,
  all: allReducer
});

export default reducer;
