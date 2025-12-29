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

const CANVAS_WIDTH = 240 + 2 * BOX_BORDER_SIZE;
const CANVAS_HEIGHT = 120;

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
    2: {
      x: 9 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    3: {
      x: 8 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    4: {
      x: 6 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    5: {
      x: 7 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    7: {
      x: 5 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    8: {
      x: 4 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    9: {
      x: 3 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    10: {
      x: 2 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    11: {
      x: 1 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    12: {
      x: 0,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    17: {
      x: 9 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    18: {
      x: 8 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    19: {
      x: 7 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    20: {
      x: 6 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    21: {
      x: 5 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    22: {
      x: 4 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    23: {
      x: 3 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    24: {
      x: 2 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    25: {
      x: 1 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    26: {
      x: 0,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
  }).reduce((acc, [key, val]) => {
    acc[key] = {
      ...val,
      x: val.x + BOX_BORDER_SIZE + 30,
      y: val.y + 82,
    };
    return acc;
  }, {}),
};

const ZONE_B_SCHEMA = {
  label: 'Zone droite',
  boxes: Object.entries({
    1: {
      x: 1 * FULL_BOX_WIDTH,
      y: 0,
      ...BOXES_SIZES['FULL_BOX'],
    },
    13: {
      x: 12 * FULL_BOX_WIDTH + HALF_BOX_WIDTH_CELLS * CELL_SIZE,
      y: 0,
      ...BOXES_SIZES['HALF_BOX'],
    },
    27: {
      x: 0,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    28: {
      x: FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    29: {
      x: 2 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    30: {
      x: 3 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    31: {
      x: 4 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    32: {
      x: 5 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    33: {
      x: 6 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    34: {
      x: 7 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    35: {
      x: 8 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    36: {
      x: 9 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    37: {
      x: 10 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    38: {
      x: 11 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    39: {
      x: 12 * FULL_BOX_WIDTH,
      y: FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    40: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    41: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    42: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + 2 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    43: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + 3 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    44: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + 4 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    45: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + 5 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    46: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + 6 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    47: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + 7 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    48: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + 8 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    49: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + 9 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    50: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + 10 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    51: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + 11 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    52: {
      x: HALF_BOX_WIDTH_CELLS * CELL_SIZE + 12 * FULL_BOX_WIDTH,
      y: 2 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['HALF_BOX'],
    },
    53: {
      x: FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    54: {
      x: 2 * FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    55: {
      x: 3 * FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    56: {
      x: 4 * FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    57: {
      x: 5 * FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    58: {
      x: 6 * FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    59: {
      x: 7 * FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    60: {
      x: 8 * FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    61: {
      x: 9 * FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    62: {
      x: 10 * FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    63: {
      x: 11 * FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
    64: {
      x: 12 * FULL_BOX_WIDTH,
      y: 3 * FULL_BOX_HEIGHT,
      ...BOXES_SIZES['FULL_BOX'],
    },
  }).reduce((acc, [key, val]) => {
    acc[key] = {
      ...val,
      x: val.x + BOX_BORDER_SIZE,
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
