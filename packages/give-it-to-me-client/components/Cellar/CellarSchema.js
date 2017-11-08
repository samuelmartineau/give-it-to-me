import React from "react";
import { select } from "d3";
import ReactFauxDOM from "react-faux-dom";

import { cellar } from "gitm-config";
const {
  CELLAR_SCHEMA,
  BOX_COLOR,
  BOX_BORDER_SIZE,
  BOX_BORDER_COLOR,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  SELECTED_COLOR
} = cellar;
import { drawBottle, drawCellar, drawBottles } from "./utils";

const CellarSchema = ({
  wine,
  wines = [],
  bottles = [],
  selectedCells = {},
  isBoxClickable = () => {},
  viewMode,
  selectMode,
  onSelectBox = () => {}
}) => {
  let svgContainer = ReactFauxDOM.createElement("svg");
  let boxId = 0;
  svgContainer.setAttribute("viewBox", `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);

  drawCellar(svgContainer);

  drawBottles(svgContainer, bottles);

  wines.forEach(wine => {
    if (wine.bottles) {
      wine.bottles.forEach(bottle => {
        drawBottle(
          svgContainer,
          WINE_TYPES[wine.wineType].color,
          bottle.box,
          bottle.cell,
          false,
          viewMode
        );
      });
    }
  });

  Object.keys(selectedCells).forEach(box => {
    selectedCells[box].forEach(cell => {
      drawBottle(svgContainer, SELECTED_COLOR, box, cell, false, viewMode);
    });
  });

  return <div>{svgContainer.toReact()}</div>;
};

export default CellarSchema;
