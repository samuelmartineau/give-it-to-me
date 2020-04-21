const WINE_TYPES = Object.freeze({
  RED: {
    label: 'rouge',
    categories: Object.freeze(['REGULAR', 'SPARKLING', 'DRY']),
    color: '#9C27B0',
  },
  WHITE: {
    label: 'blanc',
    categories: Object.freeze(['REGULAR', 'SPARKLING', 'LIQUOROUS', 'DRY']),
    color: '#CDDC39',
  },
  CHAMPAGNE: {
    label: 'champagne',
    categories: Object.freeze([
      'BRUT',
      'BLANC_DE_BLANCS',
      'BLANC_DE_NOIRS',
      'PINK',
    ]),
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

module.exports = Object.freeze({
  WINE_TYPES,
  WINE_CATEGORIES,
});
