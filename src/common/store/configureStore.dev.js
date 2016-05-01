import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import DevTools from '../containers/DevTools';
import promiseMiddleware from '../middleware/promiseMiddleware';
import remoteActionMiddleware from '../middleware/remoteActionMiddleware';
import rootReducer from '../reducers';

export default function configureStore(initialState, socket) {
    const finalCreateStore = compose(
        applyMiddleware(thunk, promiseMiddleware),
        applyMiddleware(remoteActionMiddleware(socket)),
        DevTools.instrument()
    )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
