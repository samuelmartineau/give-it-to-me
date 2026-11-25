const WINE_TYPES = Object.freeze({
  RED: {
    label: 'rouge',
    categories: Object.freeze(['REGULAR', 'SPARKLING', 'DRY']),
    color: '#8b1a3c',
  },
  WHITE: {
    label: 'blanc',
    categories: Object.freeze(['REGULAR', 'SPARKLING', 'LIQUOROUS', 'DRY']),
    color: '#e2bf35',
  },
  CHAMPAGNE: {
    label: 'champagne',
    categories: Object.freeze([
      'BRUT',
      'BLANC_DE_BLANCS',
      'BLANC_DE_NOIRS',
      'PINK',
    ]),
    color: '#97a1ab',
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

export default Object.freeze({
  WINE_TYPES,
  WINE_CATEGORIES,
});
