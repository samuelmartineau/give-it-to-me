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

function addWine(wine) {
    return {
        type: types.ADD_WINE,
        wine
    };
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
            throw error;
        });
    };
}

export function createWine(wine) {
    return {
        meta: {
            remote: true
        },
        type: types.ADD_WINE,
        data: wine
    };
}

export function selectBox(boxId) {
    return {
        type: types.SELECT_BOX,
        boxId
    };
}
