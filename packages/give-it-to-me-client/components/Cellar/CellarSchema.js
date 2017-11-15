// @flow
import React from "react";
import ReactFauxDOM from "react-faux-dom";

import { cellar } from "give-it-to-me-config";
const { CANVAS_WIDTH, CANVAS_HEIGHT } = cellar;
import { drawCellar, drawBottles, addEventOnBox } from "./utils";

type Props = {
  bottles: Array,
  selectMode: boolean,
  onBoxSelect: Function,
  classes: {}
};

const CellarSchema = ({
  bottles = [],
  selectMode = false,
  onBoxSelect = () => {},
  classes
}: Props) => {
  let svgContainer = ReactFauxDOM.createElement("svg");
  svgContainer.setAttribute("viewBox", `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);

  drawCellar(svgContainer);

  drawBottles(svgContainer, bottles);

  if (selectMode) {
    addEventOnBox(svgContainer, onBoxSelect, classes);
  }

  return <div>{svgContainer.toReact()}</div>;
};

export default CellarSchema;
