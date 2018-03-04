import { cellar } from 'give-it-to-me-config';
import { range } from 'ramda';

const { CELL_SIZE, CELLAR_SCHEMA, BOX_BORDER_SIZE } = cellar;
const boxBaseId = 'box-';
const cellBaseId = 'cell-';
const bottleBaseId = 'bottle-';

export function getBoxId(boxId) {
  return `${boxBaseId}${boxId}`;
}
export function getCellId(boxId, cellId) {
  return `${boxBaseId}${boxId}-${cellBaseId}${cellId}`;
}
export function getBottleId(boxId, cellId) {
  return `${bottleBaseId}${boxBaseId}${boxId}-${cellBaseId}${cellId}`;
}

export const getBottleInfos = (box, cell) => {
  return {
    cx:
      BOX_BORDER_SIZE +
      CELLAR_SCHEMA[box].x +
      Math.floor(cell / 3) * CELL_SIZE +
      CELL_SIZE / 2,
    cy:
      BOX_BORDER_SIZE +
      CELLAR_SCHEMA[box].y +
      (cell % 3) * CELL_SIZE +
      CELL_SIZE / 2,
    cxRelative: Math.floor(cell / 3) * CELL_SIZE + CELL_SIZE / 2,
    cyRelative: (cell % 3) * CELL_SIZE + CELL_SIZE / 2,
    radius: CELL_SIZE / 2 - 0.1
  };
};
const getCellsCountFromSchema = schema => {
  return schema.reduce((acc, value) => acc * value, 1);
};
export const getAvailableBoxes = bottles => {
  const bottlesCount = bottles.reduce((acc, bottle) => {
    if (!acc[bottle.box]) {
      Object.assign(acc, {
        [bottle.box]: 1
      });
    } else {
      Object.assign(acc, {
        [bottle.box]: acc[bottle.box] + 1
      });
    }
    return acc;
  }, {});
  return CELLAR_SCHEMA.map((boxSchema, index) => ({ ...boxSchema, id: index }))
    .filter((boxSchema, index) => {
      return (
        !bottlesCount[index] ||
        getCellsCountFromSchema(boxSchema.schema) > bottlesCount[index]
      );
    })
    .map(box => box.id);
};

export const getAvailableCells = (boxId, bottles) => {
  const cellsUsed = bottles.map(bottle => bottle.cell);
  return getBoxCells(boxId).filter(cellId => !cellsUsed.includes(cellId));
};

export const getBoxCells = boxId => {
  const boxSchema = CELLAR_SCHEMA[boxId].schema;
  const row = boxSchema[0];
  const column = boxSchema[1];
  return range(0, row * column);
};

export const boxes = range(0, CELLAR_SCHEMA.length);
