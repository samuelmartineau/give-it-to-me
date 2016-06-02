import { SET_NOTIFICATION } from '../constants/ActionTypes';

function doAction(state, action) {
    const actions = {};
    actions[SET_NOTIFICATION] = (state, action) => {
        return {...action.state, open: true};
    };

    if (typeof actions[action.type] !== 'function') {
        return state;
    }

    return actions[action.type](state, action);
}

export default function(state = {}, action) {
    return doAction(state, action);
}
