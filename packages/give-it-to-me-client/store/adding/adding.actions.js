import {
  SELECT_BOX,
  UNSELECT_BOX,
  SELECT_CELL,
  UNSELECT_CELL
} from './adding.types';

export const selectBox = (boxId, cellId) => ({
  type: SELECT_BOX,
  boxId,
  cellId
});
export const unselectBox = boxId => ({
  type: UNSELECT_BOX,
  boxId
});
export const selectCell = (boxId, cellId) => ({
  type: SELECT_CELL,
  boxId,
  cellId
});
export const unselectCell = (boxId, cellId) => ({
  type: UNSELECT_CELL,
  boxId,
  cellId
});
