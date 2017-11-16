import React from "react";
import ReactFauxDOM from "react-faux-dom";
import { withStyles } from "material-ui/styles";
import { makeCellarUtils } from "./utils";

let svgContainer = ReactFauxDOM.createElement("svg");
const { drawBox, drawBottlesInBox, addEventOnCell } = makeCellarUtils(
  svgContainer
);

const styles = () => ({
  cellClickable: {
    cursor: "pointer",
    "&:hover": {
      fill: "#7098d6"
    }
  }
});

type boxSchemaProps = {
  boxId: number,
  bottles: Array,
  classes: {
    cellClickable: String
  },
  onSelect: Function,
  selectableCells: Array<number>
};

const BoxSchema = ({
  boxId,
  bottles = [],
  classes,
  onSelect,
  selectableCells = []
}: boxSchemaProps) => {
  drawBox(boxId);
  drawBottlesInBox(bottles);

  if (onSelect) {
    addEventOnCell(boxId, selectableCells, onSelect, classes);
  }

  return <div> {svgContainer.toReact()} </div>;
};

export default withStyles(styles)(BoxSchema);
