import { combineReducers } from "redux";
import { SET_CELLAR } from "./cellar.types";

export const mapReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CELLAR:
      return action.bottles.reduce(
        (acc, contact) =>
          Object.assign(acc, {
            [contact.id]: contact
          }),
        {}
      );
    default:
      return state;
  }
};
export const getContactById = (state, id) => state[id];

export const allReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CELLAR: {
      return action.bottles.map(bottle => bottle.id);
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  map: mapReducer,
  all: allReducer
});

export default reducer;
