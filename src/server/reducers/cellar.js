import {ADD_WINE} from '../actions';

export default function reducer(state = {wines: []}, action) {
    switch (action.type) {
        case 'ADD_WINE':
            return {...state,
                wines: [...state.wines, action.data]
            };
        default:
            return state;
    }
}
