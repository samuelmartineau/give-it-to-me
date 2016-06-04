import * as actionTypes from '../constants/ActionTypes';
import * as actions from '../actions';

const acknowledgements = (store, response) => {
    let actionsSwitch = {};
    actionsSwitch[actionTypes.ADD_WINE] = () => {
        if(response.success) {
            store.dispatch(actions.resetUpload());
        }
    }
    if (typeof actionsSwitch[response.type] === 'function') {
        actionsSwitch[response.type]();
    }
    store.dispatch(actions.setNotification(response));
}

export default socket => store => next => action => {
    if (action.meta && action.meta.remote) {
        socket.emit('action', Object.assign({}, action), acknowledgements.bind(null, store));
    }
    return next(action);
}
