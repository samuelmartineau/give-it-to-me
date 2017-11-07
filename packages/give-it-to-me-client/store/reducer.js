import { combineReducers } from "redux";
import cellarReducer, * as result from "./cellar/cellar.reducer";

export default combineReducers({
  cellar: cellarReducer
});
