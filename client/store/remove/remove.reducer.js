import {
  SELECT_BOTTLE_TO_DELETE,
  UNSELECT_BOTTLE_TO_DELETE
} from './remove.types';

const defaultModel = {
  bottleIds: []
};

const removeReducer = (state = { ...defaultModel }, action) => {
  switch (action.type) {
    case SELECT_BOTTLE_TO_DELETE: {
      const { bottleId } = action.payload;
      return { bottleIds: state.bottleIds.concat(bottleId) };
    }
    case UNSELECT_BOTTLE_TO_DELETE: {
      const { bottleId } = action.payload;
      return { bottleIds: state.bottleIds.filter(id => id !== bottleId) };
    }
    default:
      return state;
  }
};

export const getRemovedBottles = state => {
  return state.bottleIds;
};

export const isBottleSelectedToBeRemoved = (state, bottleId) => {
  return state.bottleIds.includes(bottleId);
};

export default removeReducer;
