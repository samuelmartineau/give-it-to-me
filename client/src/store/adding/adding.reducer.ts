import { combineReducers } from 'redux';
import omit from 'lodash/omit';
import config from '~/config';
import { WINE_TYPES_ALL } from '~/client/helpers';
import {
  SELECT_BOX,
  UNSELECT_BOX,
  SELECT_CELL,
  UNSELECT_CELL,
  UPDATE_MODEL,
  RESET_ADD_WINE,
} from './adding.types';
import { AddingActions } from './adding.actions';
const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;
const { BOTTLE_TYPES } = config.bottleTypes;

const defaultSelectedTypes = {
  wineType: WINE_TYPES_ALL[0].id,
  wineCategory: WINE_TYPES_ALL[0].categories[0] as keyof typeof WINE_CATEGORIES,
  bottleType: <const>'1',
};

export const selectedBoxesReducer = (
  state: number[] = [],
  action: AddingActions
) => {
  switch (action.type) {
    case SELECT_BOX: {
      const { boxId } = action.payload;

      return [...state, boxId];
    }
    case UNSELECT_BOX: {
      const { boxId } = action.payload;

      return state.filter((id) => id !== boxId);
    }
    case RESET_ADD_WINE: {
      return [];
    }
    default:
      return state;
  }
};

export type SelectedCellsType = {
  [boxId: number]: number[];
};

export const selectedCellsReducer = (
  state: SelectedCellsType = {},
  action: AddingActions
) => {
  switch (action.type) {
    case SELECT_BOX: {
      const { boxId, cellId } = action.payload;

      return { ...state, [boxId]: [cellId] };
    }
    case UNSELECT_BOX: {
      const { boxId } = action.payload;

      return omit(state, [String(boxId)]);
    }
    case SELECT_CELL: {
      const { boxId, cellId } = action.payload;

      return {
        ...state,
        [boxId]: state[boxId].concat(cellId),
      };
    }
    case UNSELECT_CELL: {
      const { boxId, cellId } = action.payload;

      return {
        ...state,
        [boxId]: state[boxId].filter((id) => id !== cellId),
      };
    }
    case RESET_ADD_WINE: {
      return {};
    }
    default:
      return state;
  }
};

const defaultModel = {
  isInBoxes: true,
  ...defaultSelectedTypes,
  name: '',
  source: '',
  positionComment: '',
  count: 0,
};

export type ModelType = {
  isInBoxes: boolean;
  name: string;
  year?: number;
  source?: string;
  positionComment: string;
  count: number;
  pictureFileName?: string;
  thumbnailFileName?: string;
  wineType: keyof typeof WINE_TYPES;
  wineCategory: keyof typeof WINE_CATEGORIES;
  bottleType: keyof typeof BOTTLE_TYPES;
  blur?: string;
  wineFamily?: number;
};

export const modelReducer = (
  state: ModelType = { ...defaultModel },
  action: AddingActions
): ModelType => {
  switch (action.type) {
    case UPDATE_MODEL: {
      const { payload } = action;
      if (payload.name === 'wineType') {
        return {
          ...state,
          wineType: payload.value,
          wineCategory: WINE_TYPES[payload.value]
            .categories[0] as keyof typeof WINE_CATEGORIES,
        };
      } else if (payload.name === 'name') {
        return { ...state, name: payload.value };
      } else if (payload.name === 'year') {
        return { ...state, year: payload.value };
      } else if (payload.name === 'source') {
        return { ...state, source: payload.value };
      } else if (payload.name === 'wineCategory') {
        return { ...state, wineCategory: payload.value };
      } else if (payload.name === 'bottleType') {
        return { ...state, bottleType: payload.value };
      } else if (payload.name === 'wineFamily') {
        return { ...state, wineFamily: payload.value };
      } else if (payload.name === 'blur') {
        return { ...state, blur: payload.value };
      } else if (payload.name === 'pictureFileName') {
        return { ...state, pictureFileName: payload.value };
      } else if (payload.name === 'thumbnailFileName') {
        return { ...state, thumbnailFileName: payload.value };
      } else if (payload.name === 'count') {
        return { ...state, count: payload.value };
      } else if (payload.name === 'positionComment') {
        return { ...state, positionComment: payload.value };
      } else if (payload.name === 'isInBoxes') {
        return { ...state, isInBoxes: payload.value };
      }
      return state;
    }
    case RESET_ADD_WINE: {
      return { ...defaultModel };
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  selectedBoxes: selectedBoxesReducer,
  selectedCells: selectedCellsReducer,
  model: modelReducer,
});

export default reducer;
