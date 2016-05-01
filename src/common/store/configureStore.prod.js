import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import promiseMiddleware from '../middleware/promiseMiddleware';
import remoteActionMiddleware from '../middleware/remoteActionMiddleware';

export default function configureStore(initialState, socket) {
    const finalCreateStore = compose(
        applyMiddleware(thunk, promiseMiddleware),
        applyMiddleware(remoteActionMiddleware(socket))
    )(createStore);

    return finalCreateStore(rootReducer, initialState);
};
