import { combineReducers } from 'redux';
import {
  SELECT_BOX,
  UNSELECT_BOX,
  SELECT_CELL,
  UNSELECT_CELL
} from './adding.types';
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
    case SELECT_CELL: {
      return {
        ...state,
        [action.boxId]: state[action.boxId].concat(action.cellId)
      };
    }
    case UNSELECT_CELL: {
      return {
        ...state,
        [action.boxId]: state[action.boxId].filter(id => id !== action.cellId)
      };
    }
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
  return state[boxId] && state[boxId].includes(cellId);
};

const reducer = combineReducers({
  selectedBoxes: selectedBoxesReducer,
  selectedCells: selectedCellsReducer
});

export default reducer;
