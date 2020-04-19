import {
  SELECT_BOX_TO_BROWSE,
  SELECT_CELL_TO_BROWSE,
  UNSELECT_BOX_TO_BROWSE,
  UNSELECT_CELL_TO_BROWSE,
} from './browse.types';
import { BrowseActions } from './browse.actions';

type BrowseType = {
  boxId?: number;
  cellId?: number;
};

export const browseReducer = (
  state: BrowseType = {},
  action: BrowseActions
) => {
  switch (action.type) {
    case SELECT_BOX_TO_BROWSE: {
      const { boxId } = action.payload;

      return { boxId, cellId: undefined };
    }
    case SELECT_CELL_TO_BROWSE: {
      const { cellId } = action.payload;

      return { ...state, cellId };
    }
    case UNSELECT_BOX_TO_BROWSE: {
      return { boxId: undefined, cellId: undefined };
    }
    case UNSELECT_CELL_TO_BROWSE: {
      return { ...state, cellId: undefined };
    }
    default:
      return state;
  }
};

export default browseReducer;
