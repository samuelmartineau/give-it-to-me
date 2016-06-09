import { SET_CELLAR, SELECT_BOX, UNSELECT_BOX, SELECT_CELL, UNSELECT_CELL, SELECT_NEXT_BOX} from '../constants/ActionTypes';
import { removeItem } from '../constants/global';

function setState(state, newState) {
    return {...state,
            ...newState
        };
}

function selectBox(state, boxId) {
    const selectableBoxes = Object.keys(state.availableCells);
    let newSelectedCells = {...state.selectedCells};
    let newSelectableCells = {...state.selectableCells};
    newSelectedCells[boxId] = [state.availableCells[boxId].slice(0,1)[0]];

    if (state.availableCells[boxId].length === 1) {
        let {[boxId.toString()]: omit, ...res} = newSelectableCells
        newSelectableCells = res;
    } else {
        newSelectableCells[boxId] = removeItem(state.availableCells[boxId], 0);
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


function selectCell(state, boxId, cellId) {
    let newSelectedCells = {...state.selectedCells};
    let newSelectableCells = {...state.selectableCells};

    newSelectedCells[boxId].push(cellId);

    if (state.selectableCells[boxId].length === 1) {
        let {[boxId.toString()]: omit, ...res} = newSelectableCells;
        newSelectableCells = res;
    } else {
        newSelectableCells[boxId] = removeItem(state.selectableCells[boxId], state.selectableCells[boxId].indexOf(cellId));
    }

    return {...state,
        selectableCells: newSelectableCells,
        selectedCells: newSelectedCells
    };
}

function unselectCell(state, boxId, cellId) {
    let newSelectedCells = {...state.selectedCells};
    let newSelectableCells = {...state.selectableCells};

    newSelectableCells[boxId].push(cellId);

    if (state.selectedCells[boxId].length === 1) {
        let {[boxId.toString()]: omit, ...res} = newSelectedCells;
        newSelectedCells = res;
    } else {
        newSelectedCells[boxId] = removeItem(state.selectedCells[boxId], state.selectedCells[boxId].indexOf(cellId));
    }

    return {...state,
        selectableCells: newSelectableCells,
        selectedCells: newSelectedCells
    };
}

function selectNextBox(state) {
    const selectedBoxes = Object.keys(state.selectedCells);
    const availableBoxes = Object.keys(state.availableCells);
    const nextBoxes = availableBoxes.filter(boxId => {
        return selectedBoxes.indexOf(boxId) === -1;
    });

    return selectBox(state, nextBoxes[0]);
}

function doAction(state, action) {
    const actions = {};
    actions[SET_CELLAR] = () => setState(state, action.state);
    actions[SELECT_BOX] = () => selectBox(state, action.boxId);
    actions[UNSELECT_BOX] = () => unselectBox(state, action.boxId);
    actions[SELECT_CELL] = () => selectCell(state, action.boxId, action.cellId);
    actions[UNSELECT_CELL] = () => unselectCell(state, action.boxId, action.cellId);
    actions[SELECT_NEXT_BOX] = () => selectNextBox(state);

    if (typeof actions[action.type] !== 'function') {
        return state;
    }

    return actions[action.type]();
}

export default function(state = {bottlesByBoxes: {}, wines: [], availableCells: {}, selectedCells: {}, selectableCells: {}}, action) {
    return doAction(state, action);
}
