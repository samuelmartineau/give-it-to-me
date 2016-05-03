import findIndex from 'lodash.findindex';

import {ADD_WINE} from '../actions';
import { CELLAR_SCHEMA } from '../../common/constants/Cellar';

let boxId = 0,
    selectableCells = [];

CELLAR_SCHEMA.forEach(row => {
  row.forEach(box => {
      [...Array(box.cells).keys()].forEach(cellId => {
          selectableCells.push([boxId, cellId]);
      });
      boxId++;
  });
});

const selectedCells = selectableCells.shift();

const removeItem = (list, index) => {
    return list
            .slice(0, index)
            .concat(list.slice(index + 1));
};

export default function reducer(state = {wines: [], selectedCells: selectedCells, selectableCells: selectableCells}, action) {
    switch (action.type) {
        case ADD_WINE:
            let newSelectableCells = state.selectableCells,
                selectedCells;
            action.data.bottles.forEach(bottle => {
                const index = findIndex(state.selectableCells, function(item) { return bottle[0] === item[0] && bottle[1] === item[1]; });
                newSelectableCells = removeItem(newSelectableCells, index);
            });
            selectedCells = newSelectableCells.shift();

            return {...state,
                wines: [...state.wines, action.data],
                selectableCells: newSelectableCells,
                selectedCells: selectedCells
            };
        default:
            return state;
    }
}
