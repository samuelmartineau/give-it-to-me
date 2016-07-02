import {SET_BASKET} from '../constants/ActionTypes'

function doAction (state, action) {
  const actions = {}
  actions[SET_BASKET] = () => [...action.state]

  if (typeof actions[action.type] !== 'function') {
    return state
  }

  return actions[action.type]()
}

export default function (state = [], action) {
  return doAction(state, action)
}
