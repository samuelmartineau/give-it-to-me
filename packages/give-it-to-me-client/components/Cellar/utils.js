import { select } from "d3";
import { cellar } from "give-it-to-me-config";

const {
  CELL_SIZE,
  CELLAR_SCHEMA,
  BOX_BORDER_SIZE,
  BOX_BORDER_COLOR,
  BOX_COLOR
} = cellar;
const boxBaseId = "box-";
const cellBaseId = "cell-";

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

export const drawBottle = (svgContainer, bottle) => {
  console.log("bottle", bottle);
  const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
  select(svgContainer)
    .append("circle")
    .attr("pointer-events", "none")
    .attr("id", `${cellBaseId}${bottle.box}-${bottle.cell}`)
    .attr("cx", bottleInfos.cx)
    .attr("cy", bottleInfos.cy)
    .attr("r", bottleInfos.radius)
    .attr("fill", bottle.color);
};

export const drawCellar = svgContainer => {
  return CELLAR_SCHEMA.forEach((box, index) => {
    let svgBox = select(svgContainer).append("rect");

    svgBox
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("id", `${boxBaseId}${index}`)
      .attr("width", box.width)
      .attr("height", box.height)
      .attr("stroke-width", BOX_BORDER_SIZE)
      .attr("stroke", BOX_BORDER_COLOR)
      .attr("fill", BOX_COLOR);
  });
};
export const drawBottles = (svgContainer, bottles) => {
  return bottles.forEach(bottle => {
    drawBottle(svgContainer, bottle);
  });
};

export default drawBottle;
