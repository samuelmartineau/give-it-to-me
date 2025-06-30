import {
  TOGGLE_CHECKBOX_FILTER,
  UPDATE_INPUT_FILTER,
  GET_NEXT_HITS,
  TOGGLE_FAVORITES_FILTER,
  SYNC_URL_PARAMS,
  TOGGLE_OUTSIDE_BOXES_FILTER,
} from './search.types';
import config from '~/config';
const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;

type FilterType =
  | {
      name: 'wineTypes';
      value: keyof typeof WINE_TYPES;
    }
  | { name: 'wineCategories'; value: keyof typeof WINE_CATEGORIES }
  | { name: 'wineFamilies'; value: number };

export const toggleCheckboxFilter = (data: FilterType) =>
  <const>{
    type: TOGGLE_CHECKBOX_FILTER,
    payload: data,
  };

type InputType =
  | {
      value: number;
      name: 'minYear';
    }
  | { value: number; name: 'maxYear' }
  | { name: 'name'; value: string };

export const updateInputFilter = (data: InputType) =>
  <const>{
    type: UPDATE_INPUT_FILTER,
    payload: data,
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
  wineCategories?:
    | (keyof typeof WINE_CATEGORIES)[]
    | keyof typeof WINE_CATEGORIES;
  wineFamilies?: string[] | string;
  wineTypes: (keyof typeof WINE_TYPES)[] | keyof typeof WINE_TYPES;
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
