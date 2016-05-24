import { SET_STATE, SELECT_BOX, UNSELECT_BOX} from '../constants/ActionTypes';

function setState(state, boxId) {
    return {...state, ...action.state};
}

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

function doAction(state, action) {
    const actions = {};
    actions[SET_STATE] = () => setState(state, action.boxId);
    actions[SELECT_BOX] = () => selectBox(state, action.boxId);
    actions[UNSELECT_BOX] = () => unselectBox(state, action.boxId);

    if (typeof actions[action.type] !== 'function') {
        return state;
    }

    return actions[action.type]();
}

export default function(state = {bottlesByBoxes: {}, wines: [], selectedCells: {}, selectableCells: {}}, action) {
    return doAction(state, action);
}
