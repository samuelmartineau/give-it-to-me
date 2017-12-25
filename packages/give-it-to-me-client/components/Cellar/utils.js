import { select } from 'd3';
import { cellar } from 'give-it-to-me-config';
import { range } from 'ramda';

const {
  CELL_SIZE,
  CELLAR_SCHEMA,
  BOX_BORDER_SIZE,
  BOX_BORDER_COLOR,
  BOX_COLOR,
  FULL_BOX_WIDTH_CELLS,
  CELL_BORDER_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT
} = cellar;
const boxBaseId = 'box-';
const cellBaseId = 'cell-';

function getBoxId(boxId) {
  return `${boxBaseId}${boxId}`;
}
function getCellId(boxId, cellId) {
  return `${boxBaseId}${boxId}-${cellBaseId}${cellId}`;
}

const getBottleInfos = (box, cell) => {
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
    radius: CELL_SIZE / 2
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

const drawCommonBottle = (svgContainer, bottle) => {
  const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
  const svgBottle = svgContainer.append('circle');
  svgBottle
    .attr('pointer-events', 'none')
    .attr('id', `${cellBaseId}${bottle.box}-${bottle.cell}`)
    .attr('r', bottleInfos.radius)
    .attr('fill', bottle.color);
  return svgBottle;
};

const drawBottleInCellar = (svgContainer, bottle) => {
  const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
  return drawCommonBottle(svgContainer, bottle)
    .attr('cx', bottleInfos.cx)
    .attr('cy', bottleInfos.cy);
};
const drawBottleInBox = (svgContainer, bottle) => {
  const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
  return drawCommonBottle(svgContainer, bottle)
    .attr('cx', bottleInfos.cxRelative)
    .attr('cy', bottleInfos.cyRelative);
};

const drawCellar = svgContainer => () => {
  svgContainer.setAttribute('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);
  const wrapper = select(svgContainer).append('g');
  wrapper.attr('id', 'svg-cellar');
  return CELLAR_SCHEMA.forEach((box, index) => {
    let svgBox = wrapper.append('rect');

    svgBox
      .attr('x', box.x)
      .attr('y', box.y)
      .attr('class', 'test')
      .attr('id', getBoxId(index))
      .attr('boxid', index)
      .attr('width', box.width)
      .attr('height', box.height)
      .attr('stroke-width', BOX_BORDER_SIZE)
      .attr('stroke', BOX_BORDER_COLOR)
      .attr('fill', BOX_COLOR);
  });
};
const drawBottlesInCellar = svgContainer => bottles => {
  const wrapper = select(svgContainer).append('g');
  wrapper.attr('id', 'svg-bottles');
  return bottles.map(bottle => drawBottleInCellar(wrapper, bottle));
};

const drawBottlesInBox = svgContainer => bottles => {
  return bottles.map(bottle => drawBottleInBox(select(svgContainer), bottle));
};

const clearBottles = svgContainer => () => {
  select(svgContainer)
    .selectAll(`g[id="svg-bottles"]`)
    .remove();
};

function bindId(callback, attribut) {
  return function() {
    callback(select(this).attr(attribut));
  };
}

const addEventOnBox = svgContainer => (selectableBoxes, callback, classes) => {
  selectableBoxes.forEach(boxId => {
    select(svgContainer)
      .selectAll(`rect[id="${getBoxId(boxId)}"]`)
      .attr('class', classes.boxClickable)
      .on('click', bindId(callback, 'boxid'));
  });
};

const addEventOnCell = svgContainer => (
  boxId,
  selectableCells,
  callback,
  classes
) => {
  selectableCells.forEach(cellId => {
    select(svgContainer)
      .selectAll(`rect[id="${getCellId(boxId, cellId)}"]`)
      .attr('class', classes.cellClickable)
      .on('click', bindId(callback, 'cellid'));
  });
};

const drawBox = svgContainer => boxId => {
  const box = CELLAR_SCHEMA[boxId];

  const canvasWidth = box.schema[0] * CELL_SIZE;
  const canvasHeigh = box.schema[1] * CELL_SIZE;
  svgContainer.style.setProperty('width', '100%');
  svgContainer.style.setProperty('height', '100%');

  svgContainer.setAttribute('viewBox', `0 0 ${canvasWidth} ${canvasHeigh}`);
  svgContainer.setAttribute('width', FULL_BOX_WIDTH_CELLS * CELL_SIZE);
  svgContainer.setAttribute('height', canvasHeigh);

  let cellId = 0;

  range(0, box.schema[0]).forEach(xIndex => {
    range(0, box.schema[1]).forEach(yIndex => {
      const svgCell = select(svgContainer).append('rect');

      svgCell
        .attr('x', xIndex * CELL_SIZE)
        .attr('y', yIndex * CELL_SIZE)
        .attr('width', CELL_SIZE)
        .attr('height', CELL_SIZE)
        .attr('id', getCellId(boxId, cellId))
        .attr('cellid', cellId)
        .attr('stroke-width', CELL_BORDER_SIZE)
        .attr('stroke', BOX_BORDER_COLOR)
        .attr('fill', BOX_COLOR);
      cellId += 1;
    });
  });
};

export const getBoxCell = boxId => {
  const boxSchema = CELLAR_SCHEMA[boxId].schema;
  const row = boxSchema[0];
  const column = boxSchema[1];
  return range(0, row * column);
};

export const makeCellarUtils = svgContainer => ({
  drawCellar: drawCellar(svgContainer),
  drawBottlesInCellar: drawBottlesInCellar(svgContainer),
  drawBottlesInBox: drawBottlesInBox(svgContainer),
  addEventOnBox: addEventOnBox(svgContainer),
  drawBox: drawBox(svgContainer),
  addEventOnCell: addEventOnCell(svgContainer),
  clearBottles: clearBottles(svgContainer)
});
