import {
  TOGGLE_CHECKBOX_FILTER,
  UPDATE_INPUT_FILTER,
  GET_NEXT_HITS,
  TOGGLE_FAVORITES_FILTER,
  SYNC_URL_PARAMS,
  TOGGLE_OUTSIDE_BOXES_FILTER,
} from './search.types';

export const toggleCheckboxFilter = (key, value) =>
  <const>{
    type: TOGGLE_CHECKBOX_FILTER,
    payload: { key, value },
  };

export const updateInputFilter = (key, value) =>
  <const>{
    type: UPDATE_INPUT_FILTER,
    payload: { key, value },
  };
export const toggleFavoritesFilter = () =>
  <const>{
    type: TOGGLE_FAVORITES_FILTER,
  };
export const toggleOutsideBoxesFilter = () =>
  <const>{
    type: TOGGLE_OUTSIDE_BOXES_FILTER,
  };
export const syncUrlParams = (params) =>
  <const>{
    type: SYNC_URL_PARAMS,
    payload: {
      params,
    },
  };

export const getNextHits = () => <const>{ type: GET_NEXT_HITS };

export type SearchActions = ReturnType<
  | typeof toggleCheckboxFilter
  | typeof updateInputFilter
  | typeof toggleFavoritesFilter
  | typeof toggleOutsideBoxesFilter
  | typeof syncUrlParams
  | typeof getNextHits
>;
