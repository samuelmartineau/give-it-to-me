import { combineReducers } from 'redux';
import config from '~/config';
const { WINE_TYPES } = config.wineTypes;
import {
  SELECT_BOX,
  UNSELECT_BOX,
  SELECT_CELL,
  UNSELECT_CELL,
  UPDATE_MODEL,
  RESET_ADD_WINE
} from './adding.types';
const { DEFAULT_TYPE } = config.bottleTypes;
const { WINE_TYPES_ALL } = config.wineTypes;

const defaultSelectedTypes = {
  wineType: WINE_TYPES_ALL[0].id,
  wineCategory: WINE_TYPES_ALL[0].categories[0],
  bottleType: DEFAULT_TYPE
};

const defaultModel = {
  isInBoxes: true,
  ...defaultSelectedTypes,
  name: '',
  year: '',
  source: '',
  positionComment: '',
  count: ''
};

const requiredKeys = [
  'name',
  'year',
  'wineFamily',
  'blur',
  'thumbnailFileName',
  'pictureFileName',
  'wineType',
  'wineCategory',
  'bottleType',
  'isInBoxes'
];

import { omit } from 'ramda';

export const selectedBoxesReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_BOX: {
      const { boxId } = action.payload;

      return [...state, boxId];
    }
    case UNSELECT_BOX: {
      const { boxId } = action.payload;

      return state.filter(id => id !== boxId);
    }
    case RESET_ADD_WINE: {
      return [];
    }
    default:
      return state;
  }
};
export const selectedCellsReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_BOX: {
      const { boxId, cellId } = action.payload;

      return { ...state, [boxId]: [cellId] };
    }
    case UNSELECT_BOX: {
      const { boxId } = action.payload;

      return omit([boxId], state);
    }
    case SELECT_CELL: {
      const { boxId, cellId } = action.payload;

      return {
        ...state,
        [boxId]: state[boxId].concat(cellId)
      };
    }
    case UNSELECT_CELL: {
      const { boxId, cellId } = action.payload;

      return {
        ...state,
        [boxId]: state[boxId].filter(id => id !== cellId)
      };
    }
    case RESET_ADD_WINE: {
      return {};
    }
    default:
      return state;
  }
};
export const modelReducer = (state = { ...defaultModel }, action) => {
  switch (action.type) {
    case UPDATE_MODEL: {
      const { value, name } = action.payload;
      if (name === 'wineType') {
        return {
          ...state,
          wineType: value,
          wineCategory: WINE_TYPES[value].categories[0]
        };
      }
      return { ...state, [name]: value };
    }
    case RESET_ADD_WINE: {
      return { ...defaultModel };
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

export const isModelValid = (model, selectedBoxes) => {
  let valid = requiredKeys.every(
    key => ![null, 0, '', undefined].includes(model[key])
  );
  if (model.isInBoxes) {
    valid = valid && selectedBoxes.length > 0;
  } else {
    valid = valid && !!selectedBoxes.positionComment;
  }
  return valid;
};

export const getAddModel = (model, selectedCells) => {
  const formModel = { ...model };
  if (formModel.isInBoxes) {
    delete formModel.positionComment;
    delete formModel.count;
    formModel.bottles = Object.keys(selectedCells).reduce((acc, box) => {
      return acc.concat(
        selectedCells[box].map(cell => ({
          box,
          cell
        }))
      );
    }, []);
  }
  return formModel;
};

const reducer = combineReducers({
  selectedBoxes: selectedBoxesReducer,
  selectedCells: selectedCellsReducer,
  model: modelReducer
});

export default reducer;
