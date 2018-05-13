import { SET_FILTER } from './search.types';

export const setFilter = (boxId, cellId) => ({
  type: SET_FILTER,
  boxId,
  cellId
});
