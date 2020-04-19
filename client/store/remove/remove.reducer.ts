import {
  SELECT_BOTTLE_TO_DELETE,
  UNSELECT_BOTTLE_TO_DELETE,
  SET_COUNT,
  RESET_REMOVE_STATE,
  SELECT_WINE_TO_REMOVE,
} from './remove.types';
import { RemoveActions } from './remove.actions';

const defaultModel = {
  bottleIds: [],
  count: 1,
  wineId: null,
};

export type RemoveType = {
  bottleIds: number[];
  count: number;
  wineId: number | null;
};

const removeReducer = (
  state: RemoveType = { ...defaultModel },
  action: RemoveActions
) => {
  switch (action.type) {
    case SELECT_BOTTLE_TO_DELETE: {
      const { bottleId } = action.payload;
      return { bottleIds: state.bottleIds.concat(bottleId) };
    }
    case UNSELECT_BOTTLE_TO_DELETE: {
      const { bottleId } = action.payload;
      return { bottleIds: state.bottleIds.filter((id) => id !== bottleId) };
    }
    case SET_COUNT: {
      const { value } = action.payload;
      return { ...state, count: value };
    }
    case SELECT_WINE_TO_REMOVE: {
      const { wineId } = action.payload;
      return { ...state, wineId };
    }
    case RESET_REMOVE_STATE: {
      return { ...defaultModel, wineId: state.wineId };
    }
    default:
      return state;
  }
};

export default removeReducer;
