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

export const getCellsUsedInBox = (state, boxId) =>
  bottles.getCellsUsedInBox(state.bottles.cells, boxId);
export const getBottleById = (state, boxId) =>
  bottles.getBottleById(state.bottles.map, boxId);
export const getBottlesInBox = (state, boxId) =>
  bottles.getBottlesInBox(state.bottles.cells, boxId);
export const getSelectedCellsInBox = (state, boxId) =>
  adding.getSelectedCellsInBox(state.adding.selectedCells, boxId);
export const isCellSelected = (state, boxId, cellId) =>
  adding.isCellSelected(state.adding.selectedCells, boxId, cellId);
