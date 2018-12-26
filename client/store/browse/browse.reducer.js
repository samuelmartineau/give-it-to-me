import {
  SELECT_BOX_TO_BROWSE,
  SELECT_CELL_TO_BROWSE,
  UNSELECT_BOX_TO_BROWSE,
  UNSELECT_CELL_TO_BROWSE
} from './browse.types';

export const browseReducer = (
  state = { boxId: null, cellId: null },
  action
) => {
  switch (action.type) {
    case SELECT_BOX_TO_BROWSE: {
      const { boxId } = action.payload;

      return { boxId, cellId: null };
    }
    case SELECT_CELL_TO_BROWSE: {
      const { cellId } = action.payload;

      return { ...state, cellId };
    }
    case UNSELECT_BOX_TO_BROWSE: {
      return { boxId: null, cellId: null };
    }
    case UNSELECT_CELL_TO_BROWSE: {
      return { ...state, cellId: null };
    }
    default:
      return state;
  }
};

export default browseReducer;
