import { SET_STATE} from '../constants/ActionTypes';

export default function(state = {wines: []}, action) {
  switch (action.type) {
      case SET_STATE:
          return {...state,
              wines: [...action.state.cellar.wines]
          };
      default:
          return state;
  }
}
