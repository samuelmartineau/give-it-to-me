import fetch from 'isomorphic-fetch';

import * as serverConstants from '../constants/server';
import * as types from '../constants/ActionTypes';

export function setState(type, state) {
  return {
    type: type,
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
            method: 'POST',
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
    return dispatch => {
        return fetch([serverConstants.API_BASE_URL, serverConstants.ROUTES.WINE].join(''), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...wine})
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            throw error;
        });
    };
}


export function selectBox(boxId) {
    return {
        type: types.SELECT_BOX,
        boxId
    };
}

export function unselectBox(boxId) {
    return {
        type: types.UNSELECT_BOX,
        boxId
    };
}

export function selectCell(boxId, cellId) {
    return {
        type: types.SELECT_CELL,
        boxId,
        cellId
    };
}

export function unselectCell(boxId, cellId) {
    return {
        type: types.UNSELECT_CELL,
        boxId,
        cellId
    };
}

export function selectNextBox() {
    return {
        type: types.SELECT_NEXT_BOX
    };
}

export function setNotification(state) {
  return {
    type: types.SET_NOTIFICATION,
    state
  };
}

export function hideNotification() {
  return {
    type: types.HIDE_NOTIFICATION
  };
}

export function resetUpload() {
  return {
    type: types.RESET_UPLOAD
  };
}

export function addToBasket(wineId) {
    return dispatch => {
        return fetch([serverConstants.API_BASE_URL, serverConstants.ROUTES.BASKET].join(''), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({wineId: wineId})
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            throw error;
        });
    };
}

export function removeFromBasket(basketId) {
    return dispatch => {
        return fetch([serverConstants.API_BASE_URL, serverConstants.ROUTES.BASKET].join(''), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({basketId: basketId})
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            throw error;
        });
    };
}
