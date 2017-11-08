// @flow
import React from "react";
import ReactFauxDOM from "react-faux-dom";

import { cellar } from "gitm-config";
const { CANVAS_WIDTH, CANVAS_HEIGHT } = cellar;
import { drawCellar, drawBottles } from "./utils";

type Props = {
  bottles: Array
};

const CellarSchema = ({ bottles = [] }: Props) => {
  let svgContainer = ReactFauxDOM.createElement("svg");
  svgContainer.setAttribute("viewBox", `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);

  drawCellar(svgContainer);

  drawBottles(svgContainer, bottles);

  return <div>{svgContainer.toReact()}</div>;
};

export default CellarSchema;
