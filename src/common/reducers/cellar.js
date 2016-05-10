import { SET_STATE, SELECT_BOX} from '../constants/ActionTypes';

export default function(state = {wines: [], selectedCells: {}, selectableCells: {}}, action) {
    switch (action.type) {
        case SET_STATE:
            return {...state, ...action.state};
        case SELECT_BOX:
            let newSelectedCells = {...state.selectedCells};
            let newSelectableCells = {...state.selectableCells};
            newSelectedCells[action.boxId] = [newSelectableCells[action.boxId].shift()]
            if (!newSelectableCells[action.boxId].length) {
                delete newSelectableCells[action.boxId];
            }
            return {...state,
                selectableCells: newSelectableCells,
                selectedCells: newSelectedCells
            };
        default:
            return state;
    }
}
