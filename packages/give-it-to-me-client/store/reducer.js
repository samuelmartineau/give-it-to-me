import { combineReducers } from 'redux';
import cellarReducer, * as cellar from './cellar/cellar.reducer';
import bottlesReducer, * as bottles from './bottles/bottles.reducer';
import stepperReducer, * as stepper from './stepper/stepper.reducer';
import addingReducer, * as adding from './adding/adding.reducer';

export default combineReducers({
  cellar: cellarReducer,
  stepper: stepperReducer,
  bottles: bottlesReducer,
  adding: addingReducer
});

export const isLastStep = (state, index) =>
  stepper.isLastStep(state.stepper, index);
