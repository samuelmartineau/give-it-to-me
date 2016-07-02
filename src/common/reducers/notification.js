import {SET_SUCCESS_NOTIFICATION, SET_ERROR_NOTIFICATION, HIDE_NOTIFICATION} from '../constants/ActionTypes'

function doAction(state, action) {
  const actions = {}
  actions[SET_ERROR_NOTIFICATION] = (state, action) => ({open: true, error: true, message: action.state.message})
  actions[SET_SUCCESS_NOTIFICATION] = (state, action) => ({open: true, success: true, message: action.state.message})
  actions[HIDE_NOTIFICATION] = () => ({open: false})

  if (typeof actions[action.type] !== 'function') {
    return state
  }

  return actions[action.type](state, action)
}

export default(state = {
  open: false
}, action) => {
  return doAction(state, action)
}
