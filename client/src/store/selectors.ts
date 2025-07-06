import * as wines from './wines/wines.selectors';
import * as bottles from './bottles/bottles.selectors';
import * as adding from './adding/adding.selectors';
import * as search from './search/search.selectors';
import * as remove from './remove/remove.selectors';
import * as browse from './browse/browse.selectors';
import { getBoxCells } from '../components/Cellar/utils';
import { RootState } from '.';
import { EnhancedBottleType } from '@/Cellar.type';

export const getWineById = (state: RootState, wineId: number) =>
  wines.getWineById(state.wines.map, wineId);

export const getCellsUsedInBox = (state: RootState, boxId: number) =>
  bottles.getCellsUsedInBox(state.bottles.cells, boxId);
export const getBottleById = (state: RootState, boxId: number) =>
  bottles.getBottleById(state.bottles.map, boxId);
export const getBottlesInBox = (state: RootState, boxId: number) =>
  bottles.getBottlesInBox(state.bottles.cells, boxId);
export const getBottleByPosition = (state: RootState, boxId: number, cellId) =>
  bottles.getBottleByPosition(state.bottles.cells, boxId, cellId);
export const getSelectedCellsInBox = (state: RootState, boxId: number) =>
  adding.getSelectedCellsInBox(state.adding.selectedCells, boxId);
export const isCellSelected = (
  state: RootState,
  boxId: number,
  cellId: number,
) => adding.isCellSelected(state.adding.selectedCells, boxId, cellId);
export const isBoxSelected = (state: RootState, boxId: number) =>
  adding.isBoxSelected(state.adding.selectedBoxes, boxId);
export const isModelValid = (state) =>
  adding.isModelValid(state.adding.model, state.adding.selectedBoxes);
export const getAddModel = (state: RootState) =>
  adding.getAddModel(state.adding.model, state.adding.selectedCells);
export const isBoxSelectable = (state: RootState, boxId: number) => {
  const alreadySelected = isBoxSelected(state, boxId);
  const bottles = getCellsUsedInBox(state, boxId);
  const cells = getBoxCells(boxId);
  return !alreadySelected && cells.length > bottles.length;
};
export const isCellSelectable = (
  state: RootState,
  boxId: number,
  cellId: number,
) => {
  const alreadySelected = isCellSelected(state, boxId, cellId);
  const cellIds = getCellsUsedInBox(state, boxId);
  return !alreadySelected && !cellIds.includes(cellId);
};
export const isWineFiltered = (state: RootState, wineId: number) => {
  const wines = getWinesFiltered(state);
  return search.isWineFiltered(state.search, wines, wineId);
};

export const getWinesFiltered = (state: RootState) =>
  search.getWinesFiltered(state.wines, state.search);
export const getFiltersCount = (state: RootState) =>
  search.getFiltersCount(state.search);

export const isWineInBox = (
  state: RootState,
  boxId: number,
  wineId: number,
) => {
  const wineIds = getBottlesInBox(state, boxId).map((bottle) => bottle.wine_id);
  return wineIds.includes(wineId);
};

export const getWineBottles = (state: RootState, wineId: number) => {
  const { bottleIds } = getWineById(state, wineId);
  return bottleIds.map((bottleId) => getBottleById(state, bottleId));
};

export const getWineBottlesAsMap = (state: RootState, wineId: number) => {
  return getWineBottles(state, wineId).reduce(
    (acc, bottle) => {
      if (!acc[bottle.box]) {
        acc[bottle.box] = {};
      }
      acc[bottle.box][bottle.cell] = bottle;
      return acc;
    },
    <{ [boxId: number]: { [cellId: number]: EnhancedBottleType } }>{},
  );
};

export const getRemovedBottles = (state: RootState) =>
  remove.getRemovedBottles(state.remove);

export const isBottleSelectedToBeRemoved = (
  state: RootState,
  bottleId: number,
) => remove.isBottleSelectedToBeRemoved(state.remove, bottleId);

export const isBoxBrowsed = (state: RootState, boxId: number) =>
  browse.isBoxBrowsed(state.browse, boxId);

export const isBoxBrowseable = (state: RootState, boxId: number) => {
  const alreadyBrowsed = isBoxBrowsed(state, boxId);
  const bottles = getCellsUsedInBox(state, boxId);
  return !alreadyBrowsed && bottles.length > 0;
};

export const getBrowsedWine = (state: RootState) => {
  const { boxId, cellId } = state.browse;
  if (boxId === undefined || cellId === undefined) return null;
  const bottle = getBottleByPosition(state, boxId, cellId);
  return bottle && getWineById(state, bottle.wine_id);
};
