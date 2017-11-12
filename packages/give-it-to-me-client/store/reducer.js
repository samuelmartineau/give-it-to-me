import { combineReducers } from "redux";
import cellarReducer, * as cellar from "./cellar/cellar.reducer";
import bottlesReducer, * as bottles from "./bottles/bottles.reducer";
import stepperReducer, * as stepper from "./stepper/stepper.reducer";

export default combineReducers({
  cellar: cellarReducer,
  stepper: stepperReducer,
  bottles: bottlesReducer
});

export const isLastStep = (state, index) =>
  stepper.isLastStep(state.stepper, index);
