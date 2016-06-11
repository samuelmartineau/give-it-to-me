import { SET_STATE, SET_ERROR, HIDE_NOTIFICATION } from '../constants/ActionTypes';

function doAction(state, action) {
    const actions = {};
    actions[SET_ERROR] = (state, action) => ({open: true, ...action.state});
    actions[HIDE_NOTIFICATION] = () => ({open: false});

    if (typeof actions[action.type] !== 'function') {
        return state;
    }

    return actions[action.type](state, action);
}

export default (state = {open: false}, action) => {
    return doAction(state, action);
}
