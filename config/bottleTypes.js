const BOTTLE_TYPES = {
  0: {
    label: 'Demi bouteille',
    capacity: 0.375
  },
  1: {
    label: 'Bouteille',
    capacity: 0.75
  },
  2: {
    label: 'Magnum',
    capacity: 1.5
  },
  3: {
    label: 'Double magnum',
    capacity: 3
  },
  4: {
    label: 'Jeroboam',
    capacity: 4.5
  }
};

const DEFAULT_TYPE = '1';

const BOTTLE_TYPES_ALL = Object.keys(BOTTLE_TYPES).map(key => ({
  id: key,
  ...BOTTLE_TYPES[key]
}));

module.exports = {
  DEFAULT_TYPE,
  BOTTLE_TYPES,
  BOTTLE_TYPES_ALL
};
