import { SET_STATE } from '../constants/ActionTypes';

function doAction(state, action) {
    const actions = {};
    actions[SET_STATE] = () => [...action.state.basket];

    if (typeof actions[action.type] !== 'function') {
        return state;
    }
    
    return actions[action.type]();
}

export default function(state = [], action) {
    return doAction(state, action);
}
