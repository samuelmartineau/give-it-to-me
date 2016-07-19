import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'
import promiseMiddleware from '../middleware/promiseMiddleware'

export default function configureStore (initialState) {
  const finalCreateStore = compose(applyMiddleware(thunk, promiseMiddleware))(createStore)

  return finalCreateStore(rootReducer, initialState)
}
