import { SET_STATE} from '../constants/ActionTypes';

function setState(state, newState) {
  return {...state};
}

export default function(state = {}, action) {
  switch (action.type) {
      case SET_STATE:
        return setState(state, action.state);
      }
  return state;
}
