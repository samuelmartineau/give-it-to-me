import { combineReducers } from 'redux';
import { CELLAR_RECEIVED } from './wines.types';
import { WinesActions } from './wines.actions';
import { WineAndBottles, WineEnhanced } from '@/Cellar.type';

export type MapType = {
  [id: number]: WineEnhanced;
};

export const enhanceWine = ({
  bottles,
  ...rest
}: WineAndBottles): WineEnhanced => ({
  ...rest,
  bottleIds: bottles.map((bottle) => bottle.id),
});

export const mapReducer = (state: MapType = {}, action: WinesActions) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      return action.payload.cellar.reduce((acc, wine) => {
        return Object.assign(acc, {
          [wine.id]: enhanceWine(wine),
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
