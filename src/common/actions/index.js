import fetch from 'isomorphic-fetch'
import urlJoin from 'url-join'

import * as serverConstants from '../constants/server'
import * as types from '../constants/ActionTypes'

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    return response.json().then((result) => {
      error.response = result
      throw error
    })
  }
}

function parseJSON (response) {
  return response.json()
}

export function setState (type, state) {
  return {type: type, state}
}

function uploadPicture () {
  return {type: types.UPLOAD_PICTURE}
}

function receivePictureInfos (json) {
  return {type: types.RECEIVE_PICTURE_INFOS, json}
}

function wineAdded () {
  return {type: types.WINE_ADDED}
}

export function wineAdditionProcessing () {
  return {type: types.WINE_ADDITION_PROCESSING}
}

export function uploadWinePicture (picture) {
  return dispatch => {
    const data = new window.FormData()
    data.append(serverConstants.PICTURE_UPLOAD.FILE_NAME, picture)
    dispatch(uploadPicture())
    return fetch(urlJoin(serverConstants.API_BASE_URL, serverConstants.ROUTES.PICTURE), {
      method: 'POST',
      body: data
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      return dispatch(receivePictureInfos(json))
    })
    .catch(error => {
      dispatch(setErrorNotification(error.response))
    })
  }
}

export function addWine (wine, contextualData) {
  return dispatch => {
    return fetch(urlJoin(serverConstants.API_BASE_URL, serverConstants.ROUTES.WINE), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        wine,
        contextualData
      })
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      dispatch(wineAdded())
      dispatch(resetUpload())
      dispatch(setSuccessNotification(json))
    }).catch(error => {
      dispatch(setErrorNotification(error.response))
    })
  }
}

export function selectBox (boxId) {
  return {type: types.SELECT_BOX, boxId}
}

export function unselectBox (boxId) {
  return {type: types.UNSELECT_BOX, boxId}
}

export function selectCell (boxId, cellId) {
  return {type: types.SELECT_CELL, boxId, cellId}
}

export function unselectCell (boxId, cellId) {
  return {type: types.UNSELECT_CELL, boxId, cellId}
}

export function selectNextBox () {
  return {type: types.SELECT_NEXT_BOX}
}

export function setSuccessNotification (state) {
  return {type: types.SET_SUCCESS_NOTIFICATION, state}
}

export function setErrorNotification (state) {
  return {type: types.SET_ERROR_NOTIFICATION, state}
}

export function hideNotification () {
  return {type: types.HIDE_NOTIFICATION}
}

export function resetUpload () {
  return {type: types.RESET_UPLOAD}
}

export function addToFavorite (wineId) {
  return dispatch => {
    return fetch(urlJoin(serverConstants.API_BASE_URL, serverConstants.ROUTES.FAVORITE), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({wineId: wineId})
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      dispatch(setSuccessNotification(json))
    })
    .catch(error => {
      dispatch(setErrorNotification(error.response))
    })
  }
}

export function removeFromFavorite (wineId) {
  return dispatch => {
    return fetch(urlJoin(serverConstants.API_BASE_URL, serverConstants.ROUTES.FAVORITE, wineId), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      dispatch(setSuccessNotification(json))
    })
    .catch(error => {
      dispatch(setErrorNotification(error.response))
    })
  }
}

export function removeBottle (wineId, bottleId) {
  return dispatch => {
    return fetch(urlJoin(serverConstants.API_BASE_URL, serverConstants.ROUTES.BOTTLE, bottleId), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({wineId})
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      dispatch(setSuccessNotification(json))
    })
    .catch(error => {
      dispatch(setErrorNotification(error.response))
    })
  }
}

export function removeBottles (wineId, removeBottlesCount) {
  return dispatch => {
    return fetch(urlJoin(serverConstants.API_BASE_URL, serverConstants.ROUTES.WINE, wineId), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: {removeBottlesCount}})
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(json => {
      dispatch(setSuccessNotification(json))
    })
    .catch(error => {
      dispatch(setErrorNotification(error.response))
    })
  }
}
