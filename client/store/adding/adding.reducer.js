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
  'thumbnailFileName',
  'wineType',
  'wineCategory',
  'bottleType',
  'isInBoxes'
];

import { omit } from 'ramda';

export const selectedBoxesReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_BOX: {
      return [...state, action.boxId];
    }
    case UNSELECT_BOX: {
      return state.filter(id => id !== action.boxId);
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
      if (action.name === 'wineType') {
        return {
          ...state,
          wineType: action.value,
          wineCategory: WINE_TYPES[action.value].categories[0]
        };
      }
      return { ...state, [action.name]: action.value };
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
