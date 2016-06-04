import { SET_STATE, SET_NOTIFICATION, HIDE_NOTIFICATION } from '../constants/ActionTypes';

function doAction(state, action) {
    const actions = {};
    actions[SET_NOTIFICATION] = (state, action) => ({...action.state, open: true});
    actions[HIDE_NOTIFICATION] = () => ({open: false});

    if (typeof actions[action.type] !== 'function') {
        return state;
    }

    return actions[action.type](state, action);
}

export default (state = {}, action) => {
    return doAction(state, action);
}
