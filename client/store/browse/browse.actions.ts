import {
  SELECT_BOX_TO_BROWSE,
  UNSELECT_BOX_TO_BROWSE,
  SELECT_CELL_TO_BROWSE,
  UNSELECT_CELL_TO_BROWSE
} from './browse.types';

export const selectBoxToBrowse = boxId => ({
  type: SELECT_BOX_TO_BROWSE,
  payload: { boxId }
});
export const unselectBoxToBrowse = boxId => ({
  type: UNSELECT_BOX_TO_BROWSE,
  payload: { boxId }
});
export const selectCellToBrowse = cellId => ({
  type: SELECT_CELL_TO_BROWSE,
  payload: { cellId }
});
export const unselectCellToBrowse = cellId => ({
  type: UNSELECT_CELL_TO_BROWSE,
  payload: { cellId }
});
