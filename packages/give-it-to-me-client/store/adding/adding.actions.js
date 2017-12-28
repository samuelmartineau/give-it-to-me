import { SELECT_BOX, UNSELECT_BOX } from './adding.types';

export const selectBox = (boxId, cellId) => ({
  type: SELECT_BOX,
  boxId,
  cellId
});
export const unselectBox = boxId => ({
  type: UNSELECT_BOX,
  boxId
});
