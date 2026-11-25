import fontColorContrastModule from 'font-color-contrast';
import config from '~/config';

const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;
const { BOTTLE_TYPES } = config.bottleTypes;

export const WINE_TYPES_ALL = Object.keys(WINE_TYPES).map(
  (key: keyof typeof WINE_TYPES) => ({
    id: key,
    ...WINE_TYPES[key],
  }),
);

export const WINE_CATEGORIES_ALL = Object.keys(WINE_CATEGORIES).map(
  (key: keyof typeof WINE_CATEGORIES) => ({
    id: key,
    ...WINE_CATEGORIES[key],
  }),
);

export const BOTTLE_TYPES_ALL = Object.keys(BOTTLE_TYPES).map(
  (key: keyof typeof BOTTLE_TYPES) => ({
    id: key,
    ...BOTTLE_TYPES[key],
  }),
);

// font-color-contrast is a CommonJS module that sets `exports.default`.
// Vite 8 (rolldown) follows Node's interop rules, so the default import is the
// whole `exports` object rather than the function: unwrap it here.

type FontColorContrast = typeof fontColorContrastModule;

export const fontColorContrast: FontColorContrast =
  (fontColorContrastModule as unknown as { default?: FontColorContrast })
    .default ?? fontColorContrastModule;
