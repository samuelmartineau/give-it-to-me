const BOTTLE_TYPES = {
  0: {
    label: 'demi bouteille',
    capacity: 0.375
  },
  1: {
    label: 'bouteille',
    capacity: 0.75
  },
  2: {
    label: 'magnum',
    capacity: 1.5
  },
  3: {
    label: 'double magnum',
    capacity: 3
  },
  4: {
    label: 'jeroboam',
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
