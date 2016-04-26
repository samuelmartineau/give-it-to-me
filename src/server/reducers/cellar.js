import {addWine, INITIAL_STATE} from '../services';
import {ADD_WINE} from '../constants';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
      case 'ADD_WINE':
        return addWine(state, action.wine);
      return state;
  }
  return state;
}
