import { UPLOAD_PICTURE } from '../constants/ActionTypes';

function toggleUploading(state) {
  return {...state, isUploading: state.isUploading ? true : false};
}

export default function(state = {isUploading: true}, action) {
  switch (action.type) {
      case UPLOAD_PICTURE:
        return toggleUploading(state);
      }
  return state;
}
