import { combineReducers } from 'redux';
import { CELLAR_RECEIVED } from './wines.types';

export const mapReducer = (state = {}, action) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      return action.payload.cellar.reduce((acc, wine) => {
        const { bottles, ...rest } = wine;
        return Object.assign(acc, {
          [wine.id]: {
            ...rest,
            bottleIds: wine.bottles.map(bottle => bottle.id)
          }
        });
      }, {});
    }

    default:
      return state;
  }
};

export const allReducer = (state = [], action) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      return action.payload.cellar.map(wine => wine.id);
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
