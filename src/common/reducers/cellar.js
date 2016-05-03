import { SET_STATE} from '../constants/ActionTypes';

export default function(state = {wines: [], selectedCells: [], selectableCells: []}, action) {
  switch (action.type) {
      case SET_STATE:
          return {...action.state};
      default:
          return state;
  }
}
