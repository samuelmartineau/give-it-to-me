// @flow
import React from "react";
import { withStyles } from "material-ui/styles";
import ReactFauxDOM from "react-faux-dom";

import { makeCellarUtils } from "./utils";
let svgContainer = ReactFauxDOM.createElement("svg");
const { drawCellar, drawBottlesInCellar, addEventOnBox } = makeCellarUtils(
  svgContainer
);

const styles = () => ({
  boxClickable: {
    cursor: "pointer",
    "&:hover": {
      fill: "#7098d6"
    }
  }
});

type Props = {
  bottles: Array,
  onSelect: Function,
  classes: { boxClickable: String },
  selectableBoxes: Array<number>
};

const CellarSchema = ({
  bottles = [],
  onSelect,
  classes,
  selectableBoxes = []
}: Props) => {
  drawCellar();

  drawBottlesInCellar(bottles);

  if (onSelect) {
    addEventOnBox(selectableBoxes, onSelect, classes);
  }

  return <div>{svgContainer.toReact()}</div>;
};

export default withStyles(styles)(CellarSchema);
