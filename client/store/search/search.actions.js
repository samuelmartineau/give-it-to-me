import {
  TOGGLE_CHECKBOX_FILTER,
  UPDATE_INPUT_FILTER,
  GET_NEXT_HITS,
  TOGGLE_FAVORITES_FILTER,
  SYNC_URL_PARAMS
} from './search.types';

export const toggleCheckboxFilter = (key, value) => ({
  type: TOGGLE_CHECKBOX_FILTER,
  payload: { key, value }
});

export const updateInputFilter = (key, value) => ({
  type: UPDATE_INPUT_FILTER,
  payload: { key, value }
});
export const toggleFavoritesFilter = () => ({
  type: TOGGLE_FAVORITES_FILTER
});
export const syncUrlParams = params => ({
  type: SYNC_URL_PARAMS,
  payload: {
    params
  }
});

export const getNextHits = () => ({ type: GET_NEXT_HITS });
