import { UPLOAD_PICTURE, RECEIVE_PICTURE_INFOS } from '../constants/ActionTypes';

export default function(state = {isUploading: true}, action) {
    switch (action.type) {
        case UPLOAD_PICTURE:
            return {...state,
                isUploading: state.isUploading ? true : false
            };
        case RECEIVE_PICTURE_INFOS:
            return {...state,
                ...action.json
            };
        default:
            return state;
    }
}
