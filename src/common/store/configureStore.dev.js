import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import DevTools from '../containers/DevTools'
import promiseMiddleware from '../middleware/promiseMiddleware'
import rootReducer from '../reducers'

export default function configureStore (initialState) {
  const finalCreateStore = compose(applyMiddleware(thunk, promiseMiddleware), DevTools.instrument())(createStore)

  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
