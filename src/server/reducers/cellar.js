import {ADD_WINE} from '../actions';

import { CELLAR_SCHEMA } from '../../common/constants/Cellar';

let boxId = 0,
    selectableCells = {},
    selectedCells;

const removeItem = (list, index) => {
    return list
            .slice(0, index)
            .concat(list.slice(index + 1));
};

CELLAR_SCHEMA.forEach(box => {
    selectableCells[boxId] = Array(box.schema.reduce((x, y) => x * y, 1))
        .fill()
        .map((_, cellId) => cellId);
    boxId++;
});

function doAction(state, action) {
    const actions = {};
    actions[ADD_WINE] = () => {
        let newSelectableCells = {...selectableCells};
        let newSelectedCells = {};
        const wines = [...state.wines, action.data];
        const bottles = action.data.bottles.forEach(bottle => {
            const newList = removeItem(newSelectableCells[bottle.box], newSelectableCells[bottle.box].indexOf(bottle.cell));
            if (newList.length) {
                newSelectableCells[bottle.box] = newList;
            } else {
                delete newSelectableCells[bottle.box];
            }
        });

        const selectableBoxes = Object.keys(newSelectableCells);
        if (newSelectedCells[selectableBoxes[0]]) {
            newSelectedCells[selectableBoxes[0]] = [...newSelectedCells[selectableBoxes[0]], newSelectableCells[selectableBoxes[0]].shift()]
        } else {
            newSelectedCells[selectableBoxes[0]] = [newSelectableCells[selectableBoxes[0]].shift()]
        }
        if (!newSelectableCells[selectableBoxes[0]].length) {
            delete newSelectableCells[selectableBoxes[0]];
        }

        const bottlesByBoxes = wines.reduce((acc, wine) => {
            wine.bottles.forEach(bottle => {
                if (!acc[bottle.box]) {
                    acc[bottle.box] = [];
                }
                acc[bottle.box].push({cell: bottle.cell, type: wine.type});
            });
            return acc;
        }, {});

        // remove me
        action.data.type = 'RED';

        return {...state,
            wines: wines,
            selectableCells: newSelectableCells,
            selectedCells: newSelectedCells,
            bottlesByBoxes: bottlesByBoxes
        };
    };

    if (typeof actions[action.type] !== 'function') {
        return state;
    }

    return actions[action.type]();
}

export default function reducer(state = {bottlesByBoxes: {}, wines: [], selectedCells: {}, selectableCells: selectableCells}, action) {
    return doAction(state, action);
}
