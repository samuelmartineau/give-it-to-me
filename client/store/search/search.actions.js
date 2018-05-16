import {
  SET_FILTER,
  TOGGLE_CHECKBOX_FILTER,
  UPDATE_INPUT_FILTER
} from './search.types';

export const setFilter = (boxId, cellId) => ({
  type: SET_FILTER,
  boxId,
  cellId
});

export const toggleCheckboxFilter = (key, value) => ({
  type: TOGGLE_CHECKBOX_FILTER,
  key,
  value
});

export const updateInputFilter = (key, value) => ({
  type: UPDATE_INPUT_FILTER,
  key,
  value
});
