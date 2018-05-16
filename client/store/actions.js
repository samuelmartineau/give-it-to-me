import * as cellar from './cellar/cellar.actions';
import { difference } from 'ramda';
import * as adding from './adding/adding.actions';
import * as search from './search/search.actions';
import { getBoxCells } from '../components/Cellar/utils';
import { getCellsUsedInBox, getSelectedCellsInBox, getAddModel } from './';

export { unselectBox, selectCell, updateModel } from './adding/adding.actions';
export {
  toggleCheckboxFilter,
  updateInputFilter
} from './search/search.actions';

export const getCellar = () => {
  return dispatch => {
    return dispatch(cellar.getCellar());
  };
};
export const selectBox = boxId => {
  return (dispatch, getState) => {
    const cells = getBoxCells(boxId).map(id => id);
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
