import * as wines from './wines/wines.actions';
import { difference } from 'ramda';
import * as adding from './adding/adding.actions';
import * as search from './search/search.actions';
import * as remove from './remove/remove.actions';
import { getBoxCells } from '../components/Cellar/utils';
import { getCellsUsedInBox, getSelectedCellsInBox, getAddModel } from './';

export { unselectBox, selectCell, updateModel } from './adding/adding.actions';
export {
  getNextHits,
  toggleFavoritesFilter,
  toggleOutsideBoxesFilter,
  syncUrlParams,
} from './search/search.actions';
export { setCellar } from './wines/wines.actions';
export {
  getWineFamilies,
  createWineFamily,
} from './wineFamilies/wineFamilies.actions';
export {
  selectBoxToBrowse,
  unselectBoxToBrowse,
  selectCellToBrowse,
  unselectCellToBrowse,
} from './browse/browse.actions';
export {
  addToFavorite,
  removeFromFavorite,
} from './favorites/favorites.actions';
export {
  setRemoveCount,
  resetRemoveState,
  selectWineToRemove,
} from './remove/remove.actions';

export {
  selectBottleToDelete,
  unselectBottleToDelete,
} from './remove/remove.actions';

export const getCellar = () => {
  return (dispatch) => {
    return dispatch(wines.getCellar());
  };
};
export const selectBox = (boxId) => {
  return (dispatch, getState) => {
    const cells = getBoxCells(boxId).map((id) => id);
    const state = getState();
    const cellsUsed = getCellsUsedInBox(state, boxId);
    const availablesCells = difference(cells, cellsUsed);
    return dispatch(adding.selectBox(boxId, availablesCells[0]));
  };
};
export const unselectCell = (boxId, cellId) => {
  return (dispatch, getState) => {
    const state = getState();
    const cellsSelected = getSelectedCellsInBox(state, boxId);

    if (cellsSelected.length === 1) {
      return dispatch(adding.unselectBox(boxId));
    }
    return dispatch(adding.unselectCell(boxId, cellId));
  };
};
export const addWine = () => {
  return (dispatch, getState) => {
    const state = getState();
    const formModel = getAddModel(state);

    return dispatch(adding.addWine(formModel));
  };
};

export const toggleCheckboxFilter = (
  key: 'wineFamilies' | 'wineTypes' | 'wineCategories',
  value: number
) => {
  return (dispatch) => {
    dispatch(search.toggleCheckboxFilter(key, value));
  };
};
export const updateInputFilter = (key, value) => {
  return (dispatch) => {
    dispatch(search.updateInputFilter(key, value));
  };
};

export const removeBottles = () => {
  return (dispatch, getState) => {
    const state = getState();
    return dispatch(remove.removeBottles(state.remove.bottleIds));
  };
};

export const removeOutsideBottles = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { wineId, count } = state.remove;
    return dispatch(remove.removeOutsideBottles(wineId, count));
  };
};
