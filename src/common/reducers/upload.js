import { UPLOAD_PICTURE, RECEIVE_PICTURE_INFOS } from '../constants/ActionTypes';

export default function(state = {isUploading: false, isUploaded: false}, action) {
    switch (action.type) {
        case UPLOAD_PICTURE:
            return {...state,
                isUploading: true
            };
        case RECEIVE_PICTURE_INFOS:
            return {...state,
                ...action.json,
                isUploading: false,
                isUploaded: true
            };
        default:
            return state;
    }
}
