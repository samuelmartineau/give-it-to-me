import { SET_FILTER } from './search.types';

export default (
  state = {
    wineFamilies: [],
    wineTypes: [],
    wineCategories: [],
    period: []
  },
  action
) => {
  switch (action.type) {
    case SET_FILTER: {
      return { ...state };
    }

    default:
      return state;
  }
};
