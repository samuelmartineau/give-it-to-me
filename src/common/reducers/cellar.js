import { SET_STATE, SELECT_BOX, UNSELECT_BOX} from '../constants/ActionTypes';

function selectBox(state, boxId) {
    let newSelectedCells = {...state.selectedCells};
    let newSelectableCells = {...state.selectableCells};
    newSelectedCells[boxId] = [newSelectableCells[boxId].shift()]
    if (!newSelectableCells[boxId].length) {
        delete newSelectableCells[boxId];
    }
    return {...state,
        selectableCells: newSelectableCells,
        selectedCells: newSelectedCells
    };
}

function unselectBox(state, boxId) {
    let newSelectedCells = {...state.selectedCells};
    let newSelectableCells = {...state.selectableCells};

    if (!newSelectableCells[boxId]) {
        newSelectableCells[boxId] = [...state.selectedCells[boxId]].sort();
    } else {
        newSelectableCells[boxId] = newSelectableCells[boxId].concat(state.selectedCells[boxId]).sort();
    }

    delete newSelectedCells[boxId];

    return {...state,
        selectableCells: newSelectableCells,
        selectedCells: newSelectedCells
    };
}

export default function(state = {wines: [], selectedCells: {}, selectableCells: {}}, action) {
    switch (action.type) {
        case SET_STATE:
            return {...state, ...action.state};
        case SELECT_BOX:
            return selectBox(state, action.boxId);
        case UNSELECT_BOX:
            return unselectBox(state, action.boxId);
        default:
            return state;
    }
}
