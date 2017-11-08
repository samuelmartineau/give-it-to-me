import { combineReducers } from "redux";
import cellarReducer, * as cellar from "./cellar/cellar.reducer";
import bottlesReducer, * as bottles from "./bottles/bottles.reducer";

export default combineReducers({
  cellar: cellarReducer,
  bottles: bottlesReducer
});
