import {
  SELECT_BOTTLE_TO_DELETE,
  UNSELECT_BOTTLE_TO_DELETE,
  SET_COUNT
} from './remove.types';

const defaultModel = {
  bottleIds: [],
  count: 1
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
    case SET_COUNT: {
      const { value } = action.payload;
      return { ...state, count: value };
    }
    default:
      return state;
  }
};

export default removeReducer;
