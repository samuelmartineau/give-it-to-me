const BOX_COLOR = '#d3414a';
const BOX_BORDER_COLOR = '#992f2f';
const SELECTED_COLOR = '#2196F3';
const BOX_BORDER_SIZE = 1;
const CELL_BORDER_SIZE = 0.2;

const CELL_SIZE = 4;

const ONE_CELL_WIDTH_CELLS = 1;
const ONE_CELL_HEIGHT_CELLS = 1;

const ONE_CELL_WIDTH = ONE_CELL_WIDTH_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;
const ONE_CELL_HEIGHT = ONE_CELL_HEIGHT_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;

const FULL_BOX_WIDTH_CELLS = 4;
const FULL_BOX_HEIGHT_CELLS = 3;

const FULL_BOX_WIDTH = FULL_BOX_WIDTH_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;
const FULL_BOX_HEIGHT = FULL_BOX_HEIGHT_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;

const HALF_BOX_WIDTH_CELLS = 2;
const HALF_BOX_HEIGHT_CELLS = 3;

const HALF_BOX_WIDTH = HALF_BOX_WIDTH_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;
const HALF_BOX_HEIGHT = HALF_BOX_HEIGHT_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;

const THIRD_BOX_WIDTH_CELLS = 3;
const THIRD_BOX_HEIGHT_CELLS = 3;

const THIRD_BOX_WIDTH = THIRD_BOX_WIDTH_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;
const THIRD_BOX_HEIGHT =
  THIRD_BOX_HEIGHT_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;

const CANVAS_WIDTH = 240;
const CANVAS_HEIGHT = 90;

const BOXES_SIZES = {
  ONE_CELL: {
    width: ONE_CELL_WIDTH,
    height: ONE_CELL_HEIGHT,
    schema: [ONE_CELL_WIDTH_CELLS, ONE_CELL_HEIGHT_CELLS],
  },
  FULL_BOX: {
    width: FULL_BOX_WIDTH,
    height: FULL_BOX_HEIGHT,
    schema: [FULL_BOX_WIDTH_CELLS, FULL_BOX_HEIGHT_CELLS],
  },
  THIRD_BOX: {
    width: THIRD_BOX_WIDTH,
    height: THIRD_BOX_HEIGHT,
    schema: [THIRD_BOX_WIDTH_CELLS, THIRD_BOX_HEIGHT_CELLS],
  },
  HALF_BOX: {
    width: HALF_BOX_WIDTH,
    height: HALF_BOX_HEIGHT,
    schema: [HALF_BOX_WIDTH_CELLS, HALF_BOX_HEIGHT_CELLS],
  },
};

const ZONE_A_SCHEMA = {
  label: 'Zone gauche',
  boxes: Object.entries({
    1: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH + 11 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    2: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH + 10 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    3: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH + 9 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    4: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH + 8 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    5: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH + 7 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    6: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH + 6 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    7: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH + 5 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    8: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH + 4 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    9: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH + 3 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    10: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH + 2 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    11: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH + 1 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    12: {
      x: ONE_CELL_WIDTH + HALF_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    13: {
      x: ONE_CELL_WIDTH,
      y: 0,
      ...BOXES_SIZES['HALF_BOX'],
    },
    14: {
      x: ONE_CELL_WIDTH + 12 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['THIRD_BOX'],
    },
    15: {
      x: ONE_CELL_WIDTH + 11 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    16: {
      x: ONE_CELL_WIDTH + 10 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    17: {
      x: ONE_CELL_WIDTH + 9 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    18: {
      x: ONE_CELL_WIDTH + 8 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    19: {
      x: ONE_CELL_WIDTH + 7 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    20: {
      x: ONE_CELL_WIDTH + 6 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    21: {
      x: ONE_CELL_WIDTH + 5 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    22: {
      x: ONE_CELL_WIDTH + 4 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    23: {
      x: ONE_CELL_WIDTH + 3 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    24: {
      x: ONE_CELL_WIDTH + 2 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    25: {
      x: ONE_CELL_WIDTH + 1 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    26: {
      x: ONE_CELL_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
  }).reduce((acc, [key, val]) => {
    acc[key] = {
      ...val,
      y: val.y + 62,
    };
    return acc;
  }, {}),
};

const ZONE_B_SCHEMA = {
  label: 'Zone droite',
  boxes: Object.entries({
    27: {
      x: ONE_CELL_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    28: {
      x: ONE_CELL_WIDTH + FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    29: {
      x: ONE_CELL_WIDTH + 2 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    30: {
      x: ONE_CELL_WIDTH + 3 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    31: {
      x: ONE_CELL_WIDTH + 4 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    32: {
      x: ONE_CELL_WIDTH + 5 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    33: {
      x: ONE_CELL_WIDTH + 6 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    34: {
      x: ONE_CELL_WIDTH + 7 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    35: {
      x: ONE_CELL_WIDTH + 8 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    36: {
      x: ONE_CELL_WIDTH + 9 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    37: {
      x: ONE_CELL_WIDTH + 10 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    38: {
      x: ONE_CELL_WIDTH + 11 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    39: {
      x: ONE_CELL_WIDTH + 12 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    40: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    41: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    42: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + 2 * FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    43: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + 3 * FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    44: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + 4 * FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    45: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + 5 * FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    46: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + 6 * FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    47: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + 7 * FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    48: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + 8 * FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    49: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + 9 * FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    50: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + 10 * FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    51: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + 11 * FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    52: {
      x: 2 * BOX_BORDER_SIZE + 3 * CELL_SIZE + 12 * FULL_BOX_WIDTH,
      y: 1 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['HALF_BOX'],
    },
    53: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    54: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE + FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    55: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE + 2 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    56: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE + 3 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    57: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE + 4 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    58: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE + 5 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    59: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE + 6 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    60: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE + 7 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    61: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE + 8 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    62: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE + 9 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    63: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE + 10 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    64: {
      x: 4 * BOX_BORDER_SIZE + 5 * CELL_SIZE + 11 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
  }).reduce((acc, [key, val]) => {
    acc[key] = {
      ...val,
      y: val.y + 8,
    };
    return acc;
  }, {}),
};

const CELLAR_SCHEMA = { ...ZONE_A_SCHEMA.boxes, ...ZONE_B_SCHEMA.boxes };

export default Object.freeze({
  CELLAR_SCHEMA,
  BOX_COLOR,
  BOX_BORDER_SIZE,
  BOX_BORDER_COLOR,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  SELECTED_COLOR,
  CELL_SIZE,
  FULL_BOX_WIDTH_CELLS,
  CELL_BORDER_SIZE,
  ZONE_A_SCHEMA,
  ZONE_B_SCHEMA,
  CELLAR_SCHEMA,
});
