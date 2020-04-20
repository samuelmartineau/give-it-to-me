import {
  TOGGLE_CHECKBOX_FILTER,
  UPDATE_INPUT_FILTER,
  GET_NEXT_HITS,
  TOGGLE_FAVORITES_FILTER,
  SYNC_URL_PARAMS,
  TOGGLE_OUTSIDE_BOXES_FILTER,
} from './search.types';
import config from '~/config';

export const toggleCheckboxFilter = (
  key: 'wineFamilies' | 'wineTypes' | 'wineCategories',
  value: number
) =>
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

type Params = {
  favorites?: boolean;
  outsideBoxes?: boolean;
  wineCategories?: (keyof typeof config['wineTypes']['WINE_CATEGORIES'])[];
  wineFamilies?: string[];
  wineTypes: (keyof typeof config['wineTypes']['WINE_TYPES'])[];
};

export const syncUrlParams = (params: Params) =>
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
