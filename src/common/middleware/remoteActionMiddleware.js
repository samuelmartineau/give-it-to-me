import {setNotification} from '../actions';

let callback = (store, response) => {
    store.dispatch(setNotification(response));
};


export default socket => store => next => action => {
    if (action.meta && action.meta.remote) {
        socket.emit('action', Object.assign({}, action), callback.bind(null, store));
    }
    return next(action);
}
