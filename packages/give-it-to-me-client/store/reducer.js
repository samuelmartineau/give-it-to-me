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

export const getWineById = (state, wineId) =>
  cellar.getWineById(state.cellar.map, wineId);

export const getSelectedBoxes = state =>
  adding.getSelectedBoxes(state.adding.selectedCells);
export const getSelectedCells = state =>
  adding.getSelectedCells(state.adding.selectedCells);
export const getbottlesInBox = (state, boxId) =>
  bottles.getbottlesInBox(state.bottles.cells, boxId);
