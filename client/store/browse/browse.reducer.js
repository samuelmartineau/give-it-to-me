import { SELECT_BOX_TO_BROWSE, UNSELECT_BOX_TO_BROWSE } from './browse.types';

export const browseReducer = (state = [], action) => {
  switch (action.type) {
    case SELECT_BOX_TO_BROWSE: {
      const { boxId } = action.payload;

      return [...state, boxId];
    }
    case UNSELECT_BOX_TO_BROWSE: {
      const { boxId } = action.payload;

      return state.filter(id => id !== boxId);
    }
    default:
      return state;
  }
};

export default browseReducer;
