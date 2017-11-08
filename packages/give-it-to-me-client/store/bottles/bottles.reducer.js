import { combineReducers } from "redux";
import { CELLAR_RECEIVED } from "../cellar/cellar.types";
import { wineTypes } from "gitm-config";

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

const reducer = combineReducers({
  map: mapReducer,
  cells: cellsReducer,
  all: allReducer
});

export default reducer;
