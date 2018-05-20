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
