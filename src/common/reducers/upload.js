import { UPLOAD_PICTURE, RECEIVE_PICTURE_INFOS } from '../constants/ActionTypes';

function doAction(state, action) {
    const actions = {};
    actions[UPLOAD_PICTURE] = () => {return {...state, isUploading: true};};
    actions[RECEIVE_PICTURE_INFOS] = () => {return {...state, ...action.json, isUploading: false, isUploaded: true};};

    if (typeof actions[action.type] !== 'function') {
        return state;
    }

    return actions[action.type]();
}

export default function(state = {isUploading: false, isUploaded: false}, action) {
    return doAction(state, action);
}
