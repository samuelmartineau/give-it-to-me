import { combineReducers } from 'redux';
import { SELECT_BOX, UNSELECT_BOX } from './adding.types';

export const selectedBoxesReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_BOX: {
      return [...state, action.boxId];
    }
    // case UNSELECT_BOX: {
    //   const { [action.boxId]: _, ...rest } = state;
    //   return rest;
    // }
    default:
      return state;
  }
};
export const selectedCellsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_BOX: {
      return { ...state, [action.boxId]: [action.cellId] };
    }
    // case UNSELECT_BOX: {
    //   const { [action.boxId]: _, ...rest } = state;
    //   return rest;
    // }
    default:
      return state;
  }
};

export const getSelectedCellsInBox = (selectedCells, boxId) => {
  return selectedCells[boxId];
};
export const isCellSelected = (state, boxId, cellId) => {
  return state[boxId] && state[boxId].includes(String(cellId));
};

const reducer = combineReducers({
  selectedBoxes: selectedBoxesReducer,
  selectedCells: selectedCellsReducer
});

export default reducer;
