import {ADD_WINE} from '../actions';

import { CELLAR_SCHEMA } from '../../common/constants/Cellar';
import { removeItem } from '../../common/constants/global';

let boxId = 0,
    availableCells = {},
    selectedCells;

CELLAR_SCHEMA.forEach(box => {
    availableCells[boxId] = Array(box.schema.reduce((x, y) => x * y, 1))
        .fill()
        .map((_, cellId) => cellId);
    boxId++;
});

function doAction(state, action) {
    const actions = {};
    actions[ADD_WINE] = () => {
        let newAvailableCells = {...state.availableCells};
        let newSelectedCells = {};

        // remove me
        action.data.type = 'RED';

        const wines = [...state.wines, action.data];
        const bottles = action.data.bottles.forEach(bottle => {
            const newList = removeItem(newAvailableCells[bottle.box], newAvailableCells[bottle.box].indexOf(bottle.cell));

            if (newList.length) {
                newAvailableCells[bottle.box] = newList;
            } else {
                let {[bottle.box]: omit, ...res} = newAvailableCells
                newAvailableCells = res;
            }
        });

        let newSelectableCells = {...newAvailableCells}
        const selectableBoxes = Object.keys(newSelectableCells);
        newSelectedCells[selectableBoxes[0]] = [newAvailableCells[selectableBoxes[0]].slice(0,1)[0]];

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

        return {...state,
            wines: wines,
            availableCells: newAvailableCells,
            bottlesByBoxes: bottlesByBoxes,
            selectableCells: newSelectableCells,
            selectedCells: newSelectedCells
        };
    };

    if (typeof actions[action.type] !== 'function') {
        return state;
    }

    return actions[action.type]();
}

export default function reducer(state = {bottlesByBoxes: {}, wines: [], availableCells: availableCells, selectedCells: {}}, action) {
    return doAction(state, action);
}
