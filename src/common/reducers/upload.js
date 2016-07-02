import {UPLOAD_PICTURE, RECEIVE_PICTURE_INFOS, RESET_UPLOAD} from '../constants/ActionTypes'

function doAction(state, action) {
  const actions = {}
  actions[UPLOAD_PICTURE] = () => ({
    ...state,
    isUploading: true
  })
  actions[RECEIVE_PICTURE_INFOS] = () => ({
    ...state,
    ...action.json,
    isUploading: false,
    isUploaded: true
  })
  actions[RESET_UPLOAD] = () => ({isUploading: false, isUploaded: false})

  if (typeof actions[action.type] !== 'function') {
    return state
  }

  return actions[action.type]()
}

export default function(state = {
  isUploading: false,
  isUploaded: false
}, action) {
  return doAction(state, action)
}
