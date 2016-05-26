import { SET_STATE, SELECT_BOX, UNSELECT_BOX} from '../constants/ActionTypes';
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
        let {[boxId]: omit, ...res} = newSelectableCells
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

function doAction(state, action) {
    const actions = {};
    actions[SET_STATE] = () => setState(state, action.state);
    actions[SELECT_BOX] = () => selectBox(state, action.boxId);
    actions[UNSELECT_BOX] = () => unselectBox(state, action.boxId);

    if (typeof actions[action.type] !== 'function') {
        return state;
    }

    return actions[action.type]();
}

export default function(state = {bottlesByBoxes: {}, wines: [], availableCells: {}, selectedCells: {}, selectableCells: {}}, action) {
    return doAction(state, action);
}
