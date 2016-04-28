import fetch from 'isomorphic-fetch';

import * as serverConstants from '../constants/server';
import * as types from '../constants/ActionTypes';

export function setState(state) {
  return {
    type: types.SET_STATE,
    state
  };
}

function uploadPicture() {
    return {
        type: types.UPLOAD_PICTURE
    };
}

function receivePictureInfos(json) {
  return {
    type: types.RECEIVE_PICTURE_INFOS,
    json
  }
}

export function uploadWinePicture(picture) {
    return dispatch => {
        const data = new FormData();
        data.append(serverConstants.PICTURE_UPLOAD.FILE_NAME, picture);
        dispatch(uploadPicture());
        return fetch([serverConstants.API_BASE_URL, serverConstants.ROUTES.PICTURE].join(''), {
            method: 'post',
            body: data
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            return dispatch(receivePictureInfos(json))
        })
        .catch(error => {
            debugger
            throw error;
        });
    };
}
