import { WINE_TYPES, WINE_CATEGORIES } from '~/config/wineTypes';
import { BOTTLE_TYPES } from '~/config/bottleTypes';

export const WINE_TYPES_ALL = Object.keys(WINE_TYPES).map(
  (key: keyof typeof WINE_TYPES) => ({
    id: key,
    ...WINE_TYPES[key],
  })
);

export const WINE_CATEGORIES_ALL = Object.keys(WINE_CATEGORIES).map(
  (key: keyof typeof WINE_CATEGORIES) => ({
    id: key,
    ...WINE_CATEGORIES[key],
  })
);

export const BOTTLE_TYPES_ALL = Object.keys(BOTTLE_TYPES).map(
  (key: keyof typeof BOTTLE_TYPES) => ({
    id: key,
    ...BOTTLE_TYPES[key],
  })
);
