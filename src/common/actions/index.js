import fetch from 'isomorphic-fetch'
import urlJoin from 'url-join'

import * as serverConstants from '../constants/server'
import * as types from '../constants/ActionTypes'

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

function wineAdditionProcessing () {
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
    }).then(response => {
      return response.json()
    }).then(json => {
      return dispatch(receivePictureInfos(json))
    }).catch(error => {
      throw error
    })
  }
}

export function addWine (wine, contextualData) {
  return dispatch => {
    dispatch(wineAdditionProcessing())
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
    }).then(response => {
      return response.json()
    }).then(json => {
      dispatch(wineAdded())
      dispatch(resetUpload())
      dispatch(setSuccessNotification(json))
    }).catch(error => {
      dispatch(setErrorNotification(error))
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

export function addToBasket (wineId) {
  return dispatch => {
    return fetch(urlJoin(serverConstants.API_BASE_URL, serverConstants.ROUTES.BASKET), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({wineId: wineId})
    }).then(response => {
      return response.json()
    }).then(json => {
      dispatch(setSuccessNotification(json))
    }).catch(error => {
      dispatch(setErrorNotification(error))
    })
  }
}

export function removeFromBasket (basketId) {
  return dispatch => {
    return fetch(urlJoin(serverConstants.API_BASE_URL, serverConstants.ROUTES.BASKET), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({basketId: basketId})
    }).then(response => {
      return response.json()
    }).then(json => {
      dispatch(setSuccessNotification(json))
    }).catch(error => {
      dispatch(setErrorNotification(error))
    })
  }
}

export function removeBottle (wineId, boxId, cellId) {
  return dispatch => {
    return fetch(urlJoin(serverConstants.API_BASE_URL, serverConstants.ROUTES.BOTTLE, wineId), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({wineId, boxId, cellId})
    }).then(response => {
      debugger
      return response.json()
    }).then(json => {
      dispatch(setSuccessNotification(json))
    }).catch(error => {
      dispatch(setErrorNotification(error))
    })
  }
}
