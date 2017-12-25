import { SELECT_BOX } from './adding.types';

export const selectBox = (boxId, cellId) => ({
  type: SELECT_BOX,
  boxId,
  cellId
});
