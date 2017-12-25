import { combineReducers } from 'redux';
import { SELECT_BOX } from './adding.types';

export const selectedCellsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_BOX: {
      return { ...state, [action.boxId]: [action.cellId] };
    }
    default:
      return state;
  }
};

export const getSelectedCells = selectedCells =>
  Object.keys(selectedCells).reduce((acc, boxId) => {
    return acc.concat(
      selectedCells[boxId].map(cellId => ({
        box: boxId,
        cell: cellId
      }))
    );
  }, []);

export const getSelectedBoxes = selectedCells => Object.keys(selectedCells);

const reducer = combineReducers({
  selectedCells: selectedCellsReducer
});

export default reducer;
