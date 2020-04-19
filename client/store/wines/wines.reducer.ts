import { combineReducers } from 'redux';
import { WineType } from '~/client/components/Wine/Wine.type';
import { CELLAR_RECEIVED } from './wines.types';
import { WinesActions } from './wines.actions';

type MapType = {
  [id: number]: WineType & { bottleIds: number[] };
};

export const mapReducer = (state: MapType = {}, action: WinesActions) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      return action.payload.cellar.reduce((acc, wine) => {
        const { bottles, ...rest } = wine;
        return Object.assign(acc, {
          [wine.id]: {
            ...rest,
            bottleIds: wine.bottles.map((bottle) => bottle.id),
          },
        });
      }, {});
    }

    default:
      return state;
  }
};

export const allReducer = (state: number[] = [], action: WinesActions) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      return action.payload.cellar.map((wine) => wine.id);
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  map: mapReducer,
  all: allReducer,
});

export default reducer;
