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
    selectableCells[boxId] = Array(box.cells)
        .fill()
        .map((_, cellId) => cellId);
    boxId++;
});

export default function reducer(state = {wines: [], selectedCells: {}, selectableCells: selectableCells}, action) {
    switch (action.type) {
        case ADD_WINE:
            let newSelectableCells = {...selectableCells};
            let newSelectedCells = {};
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

            // remove me
            action.data.type = 'RED';

            return {...state,
                wines: [...state.wines, action.data],
                selectableCells: newSelectableCells,
                selectedCells: newSelectedCells
            };
        default:
            return state;
    }
}
