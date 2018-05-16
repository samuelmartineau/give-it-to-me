import { SET_FILTER, TOGGLE_CHECKBOX_FILTER } from './search.types';

export const setFilter = (boxId, cellId) => ({
  type: SET_FILTER,
  boxId,
  cellId
});

export const toggleCheckbox = (key, value) => ({
  type: TOGGLE_CHECKBOX_FILTER,
  key,
  value
});
