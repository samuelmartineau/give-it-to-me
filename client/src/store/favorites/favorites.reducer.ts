import { combineReducers } from 'redux';
import { CELLAR_RECEIVED } from '../wines/wines.types';
import { WinesActions } from '@/store/wines/wines.actions';

export const allReducer = (state: number[] = [], action: WinesActions) => {
  switch (action.type) {
    case CELLAR_RECEIVED: {
      const { cellar } = action.payload;

      return cellar.filter((wine) => wine.isFavorite).map((wine) => wine.id);
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  all: allReducer,
});

export default reducer;
