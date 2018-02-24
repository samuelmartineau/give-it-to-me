import { combineReducers } from 'redux';
import { SELECT_BOX, UNSELECT_BOX } from './adding.types';
import { omit } from 'ramda';

export const selectedBoxesReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_BOX: {
      return [...state, action.boxId];
    }
    case UNSELECT_BOX: {
      return state.filter(id => id !== action.boxId);
    }
    default:
      return state;
  }
};
export const selectedCellsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_BOX: {
      return { ...state, [action.boxId]: [action.cellId] };
    }
    case UNSELECT_BOX: {
      return omit([action.boxId], state);
    }
    // case UNSELECT_CELL: {
    //   const { [action.boxId]: _, ...rest } = state;
    //   return rest;
    // }
    default:
      return state;
  }
};

export const isBoxSelected = (state, boxId) => {
  return state.includes(boxId);
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
