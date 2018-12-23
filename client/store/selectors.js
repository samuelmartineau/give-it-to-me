import * as wines from './wines/wines.selectors';
import * as bottles from './bottles/bottles.selectors';
import * as adding from './adding/adding.selectors';
import * as search from './search/search.selectors';
import * as remove from './remove/remove.selectors';
import * as browse from './browse/browse.selectors';
import { getBoxCells } from '../components/Cellar/utils';

export const getWineById = (state, wineId) =>
  wines.getWineById(state.wines.map, wineId);

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
export const isModelValid = state =>
  adding.isModelValid(state.adding.model, state.adding.selectedBoxes);
export const getAddModel = state =>
  adding.getAddModel(state.adding.model, state.adding.selectedCells);
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
export const isWineFiltered = (state, wineId) => {
  const wines = getWinesFiltered(state);
  return search.isWineFiltered(state.search, wines, wineId);
};

export const getWinesFiltered = state =>
  search.getWinesFiltered(state.wines, state.search);

export const isWineInBox = (state, boxId, wineId) => {
  const wineIds = getBottlesInBox(state, boxId).map(bottle => bottle.wine_id);
  return wineIds.includes(wineId);
};

export const getWineBottles = (state, wineId) => {
  const { bottleIds } = getWineById(state, wineId);
  return bottleIds.map(bottleId => getBottleById(state, bottleId));
};

export const getWineBottlesAsMap = (state, wineId) => {
  return getWineBottles(state, wineId).reduce((acc, bottle) => {
    if (!acc[bottle.box]) {
      acc[bottle.box] = {};
    }
    acc[bottle.box][bottle.cell] = bottle;
    return acc;
  }, {});
};

export const getRemovedBottles = state =>
  remove.getRemovedBottles(state.remove);
export const isBottleSelectedToBeRemoved = (state, bottleId) =>
  remove.isBottleSelectedToBeRemoved(state.remove, bottleId);

export const isBoxBrowsed = (state, boxId) =>
  browse.isBoxBrowsed(state.browse, boxId);

export const isBoxBrowseable = (state, boxId) => {
  const alreadyBrowsed = isBoxBrowsed(state, boxId);
  const bottles = getCellsUsedInBox(state, boxId);
  return !alreadyBrowsed && bottles.length > 0;
};
