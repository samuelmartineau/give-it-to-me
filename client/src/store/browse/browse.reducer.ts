import {
  SELECT_BOX_TO_BROWSE,
  SELECT_CELL_TO_BROWSE,
  UNSELECT_BOX_TO_BROWSE,
  UNSELECT_CELL_TO_BROWSE,
  SELECT_OUTSIDE_WINE_TO_BROWSE,
  UNSELECT_OUTSIDE_WINE_TO_BROWSE,
} from './browse.types';
import { BrowseActions } from './browse.actions';

type BrowseType = {
  boxId?: number;
  cellId?: number;
  /** Wine stored outside the boxes; exclusive with boxId/cellId. */
  outsideWineId?: number;
};

export const browseReducer = (
  state: BrowseType = {},
  action: BrowseActions,
): BrowseType => {
  switch (action.type) {
    case SELECT_BOX_TO_BROWSE: {
      const { boxId } = action.payload;

      return { boxId, cellId: undefined, outsideWineId: undefined };
    }
    case SELECT_CELL_TO_BROWSE: {
      const { cellId } = action.payload;

      return { ...state, cellId };
    }
    case UNSELECT_BOX_TO_BROWSE: {
      return { ...state, boxId: undefined, cellId: undefined };
    }
    case SELECT_OUTSIDE_WINE_TO_BROWSE: {
      const { wineId } = action.payload;

      return { boxId: undefined, cellId: undefined, outsideWineId: wineId };
    }
    case UNSELECT_OUTSIDE_WINE_TO_BROWSE: {
      return { ...state, outsideWineId: undefined };
    }
    case UNSELECT_CELL_TO_BROWSE: {
      return { ...state, cellId: undefined };
    }
    default:
      return state;
  }
};

export default browseReducer;
