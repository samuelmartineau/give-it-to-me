export const BOX_COLOR = '#d3414a';
export const BOX_BORDER_COLOR = '#992f2f';
export const BOX_BORDER_SIZE = 1;

export const CELL_SIZE = 4;

const ONE_CELL_WIDTH_CELLS = 1;
const ONE_CELL_HEIGHT_CELLS = 1;

export const ONE_CELL_WIDTH = ONE_CELL_WIDTH_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;
export const ONE_CELL_HEIGHT = ONE_CELL_HEIGHT_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;

const FULL_BOX_WIDTH_CELLS = 4;
const FULL_BOX_HEIGHT_CELLS = 3;

export const FULL_BOX_WIDTH = FULL_BOX_WIDTH_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;
export const FULL_BOX_HEIGHT = FULL_BOX_HEIGHT_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;

const HALF_BOX_WIDTH_CELLS = 2;
const HALF_BOX_HEIGHT_CELLS = 3;

export const HALF_BOX_WIDTH = HALF_BOX_WIDTH_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;
export const HALF_BOX_HEIGHT = HALF_BOX_HEIGHT_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;

const THIRD_BOX_WIDTH_CELLS = 3;
const THIRD_BOX_HEIGHT_CELLS = 3;

export const THIRD_BOX_WIDTH = THIRD_BOX_WIDTH_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;
export const THIRD_BOX_HEIGHT = THIRD_BOX_HEIGHT_CELLS * CELL_SIZE + 2 * BOX_BORDER_SIZE;

export const CANVAS_WIDTH = 4 * BOX_BORDER_SIZE + 5*ONE_CELL_WIDTH + 12*FULL_BOX_WIDTH;
export const CANVAS_HEIGHT = 5*FULL_BOX_HEIGHT;

export const getBottleInfos = function(box, cell) {
    return {
        cx: BOX_BORDER_SIZE + CELLAR_SCHEMA[box].x + Math.floor(cell/3) * CELL_SIZE + CELL_SIZE / 2,
        cy: BOX_BORDER_SIZE + CELLAR_SCHEMA[box].y + (cell % 3) * CELL_SIZE + CELL_SIZE / 2,
        radius: CELL_SIZE / 2
    }
};

export const BOXES_SIZES = {
    ONE_CELL: {
        width: ONE_CELL_WIDTH,
        height: ONE_CELL_HEIGHT,
        cells: ONE_CELL_WIDTH_CELLS * ONE_CELL_HEIGHT_CELLS
    },
    FULL_BOX: {
        width: FULL_BOX_WIDTH,
        height: FULL_BOX_HEIGHT,
        cells: FULL_BOX_WIDTH_CELLS * FULL_BOX_HEIGHT_CELLS
    },
    THIRD_BOX: {
        width: THIRD_BOX_WIDTH,
        height: THIRD_BOX_HEIGHT,
        cells: THIRD_BOX_WIDTH_CELLS * THIRD_BOX_HEIGHT_CELLS
    },
    HALF_BOX: {
        width: HALF_BOX_WIDTH,
        height: HALF_BOX_HEIGHT,
        cells: HALF_BOX_WIDTH_CELLS * HALF_BOX_HEIGHT_CELLS
    }
}
export const CELLAR_SCHEMA = [
    {
        x: 0,
        y: 2 * CELL_SIZE,
        ...BOXES_SIZES['ONE_CELL']
    }, {
        x: ONE_CELL_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 2 * FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 3 * FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 4 * FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 5 * FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 6 * FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 7 * FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 8 * FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 9 * FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 10 * FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 11 * FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 12 * FULL_BOX_WIDTH,
        y: 0,
        ...BOXES_SIZES['HALF_BOX']
    },
    {
        x: 0,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['THIRD_BOX']
    }, {
        x: THIRD_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: THIRD_BOX_WIDTH + FULL_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: THIRD_BOX_WIDTH + 2 * FULL_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: THIRD_BOX_WIDTH + 3 * FULL_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: THIRD_BOX_WIDTH + 4 * FULL_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: THIRD_BOX_WIDTH + 5 * FULL_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: THIRD_BOX_WIDTH + 6 * FULL_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: THIRD_BOX_WIDTH + 7 * FULL_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: THIRD_BOX_WIDTH + 8 * FULL_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: THIRD_BOX_WIDTH + 9 * FULL_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: THIRD_BOX_WIDTH + 10 * FULL_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: THIRD_BOX_WIDTH + 11 * FULL_BOX_WIDTH,
        y: FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    },
    {
        x: ONE_CELL_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 2 * FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 3 * FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 4 * FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 5 * FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 6 * FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 7 * FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 8 * FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 9 * FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 10 * FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 11 * FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: ONE_CELL_WIDTH + 12 * FULL_BOX_WIDTH,
        y: 2 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    },
    {
        x: 3 * CELL_SIZE,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + 2 * FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + 3 * FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + 4 * FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + 5 * FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + 6 * FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + 7 * FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + 8 * FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + 9 * FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + 10 * FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + 11 * FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 3 * CELL_SIZE + 12 * FULL_BOX_WIDTH,
        y: 3 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['HALF_BOX']
    },
    {
        x: 5 * CELL_SIZE,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 5 * CELL_SIZE + FULL_BOX_WIDTH,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 5 * CELL_SIZE + 2 * FULL_BOX_WIDTH,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 5 * CELL_SIZE + 3 * FULL_BOX_WIDTH,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 5 * CELL_SIZE + 4 * FULL_BOX_WIDTH,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 5 * CELL_SIZE + 5 * FULL_BOX_WIDTH,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 5 * CELL_SIZE + 6 * FULL_BOX_WIDTH,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 5 * CELL_SIZE + 7 * FULL_BOX_WIDTH,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 5 * CELL_SIZE + 8 * FULL_BOX_WIDTH,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 5 * CELL_SIZE + 9 * FULL_BOX_WIDTH,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 5 * CELL_SIZE + 10 * FULL_BOX_WIDTH,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }, {
        x: 5 * CELL_SIZE + 11 * FULL_BOX_WIDTH,
        y: 4 * FULL_BOX_HEIGHT,
        ...BOXES_SIZES['FULL_BOX']
    }
];
