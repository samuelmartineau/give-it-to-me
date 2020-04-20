const WINE_TYPES = Object.freeze({
  RED: {
    label: 'rouge',
    categories: ['REGULAR', 'SPARKLING', 'DRY'],
    color: '#9C27B0',
  },
  WHITE: {
    label: 'blanc',
    categories: ['REGULAR', 'SPARKLING', 'LIQUOROUS', 'DRY'],
    color: '#CDDC39',
  },
  CHAMPAGNE: {
    label: 'champagne',
    categories: ['BRUT', 'BLANC_DE_BLANCS', 'BLANC_DE_NOIRS', 'PINK'],
    color: '#9E9E9E',
  },
});

const WINE_CATEGORIES = Object.freeze({
  REGULAR: {
    label: 'normal',
  },
  SPARKLING: {
    label: 'effervescent',
  },
  LIQUOROUS: {
    label: 'liquoreux',
  },
  SOFT: {
    label: 'moelleux',
  },
  DRY: {
    label: 'sec',
  },
  PINK: {
    label: 'rosé',
  },
  BRUT: {
    label: 'brut',
  },
  BLANC_DE_BLANCS: {
    label: 'blanc de blancs',
  },
  BLANC_DE_NOIRS: {
    label: 'blanc de noirs',
  },
});

const DEFAULT_TYPE = 0;
const DEFAULT_CATEGORY = 0;

const WINE_TYPES_ALL = Object.keys(WINE_TYPES).map((key) => ({
  id: key,
  ...WINE_TYPES[key],
}));

const WINE_CATEGORIES_ALL = Object.keys(WINE_CATEGORIES).map((key) => ({
  id: key,
  ...WINE_CATEGORIES[key],
}));

module.exports = Object.freeze({
  WINE_TYPES,
  WINE_CATEGORIES,
  DEFAULT_TYPE,
  DEFAULT_CATEGORY,
  WINE_TYPES_ALL,
  WINE_CATEGORIES_ALL,
});
