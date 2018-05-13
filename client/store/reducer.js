import { combineReducers } from 'redux';
import cellarReducer, * as cellar from './cellar/cellar.reducer';
import bottlesReducer, * as bottles from './bottles/bottles.reducer';
import addingReducer, * as adding from './adding/adding.reducer';
import { getBoxCells } from '../components/Cellar/utils';

export default combineReducers({
  cellar: cellarReducer,
  bottles: bottlesReducer,
  adding: addingReducer
});

export const getWineById = (state, wineId) =>
  cellar.getWineById(state.cellar.map, wineId);

export const getCellsUsedInBox = (state, boxId) =>
  bottles.getCellsUsedInBox(state.bottles.cells, boxId);
export const getBottleById = (state, boxId) =>
  bottles.getBottleById(state.bottles.map, boxId);
export const getBottlesInBox = (state, boxId) =>
  bottles.getBottlesInBox(state.bottles.cells, boxId);
export const getBottleByPosition = (state, boxId, cellId) =>
  bottles.getBottleByPosition(state.bottles.cells, boxId, cellId);
export const getSelectedCellsInBox = (state, boxId) =>
  adding.getSelectedCellsInBox(state.adding.selectedCells, boxId);
export const isCellSelected = (state, boxId, cellId) =>
  adding.isCellSelected(state.adding.selectedCells, boxId, cellId);
export const isBoxSelected = (state, boxId) =>
  adding.isBoxSelected(state.adding.selectedBoxes, boxId);
export const isBoxSelectable = (state, boxId) => {
  const alreadySelected = isBoxSelected(state, boxId);
  const bottles = getCellsUsedInBox(state, boxId);
  const cells = getBoxCells(boxId);
  return !alreadySelected && cells.length > bottles.length;
};
export const isCellSelectable = (state, boxId, cellId) => {
  const alreadySelected = isCellSelected(state, boxId, cellId);
  const cellIds = getCellsUsedInBox(state, boxId);
  return !alreadySelected && !cellIds.includes(cellId);
};
