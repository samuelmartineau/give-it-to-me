import React from "react";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import Switch from "material-ui/Switch";
import CellarSchema from "../Cellar/CellarSchema";
import { getAvailableBoxes } from "../Cellar/utils";

class CellsSelector extends React.Component {
  state = {
    checked: false,
    selection: {
      12: [0]
    }
  };

  onBoxSelect = boxId => {
    this.setState(state => ({
      selection: {
        ...state.selection,
        [boxId]: [0]
      }
    }));
  };
  render() {
    const { bottles } = this.props;
    const { selection } = this.state;
    const selectedBottles = Object.keys(selection).reduce((acc, boxId) => {
      return acc.concat(
        selection[boxId].map(cellId => ({
          box: boxId,
          cell: cellId,
          color: "blue"
        }))
      );
    }, []);
    // console.log("selectedBottles", selectedBottles);
    const realBottlesAndSelected = bottles.concat(selectedBottles);
    const availableBoxes = getAvailableBoxes(bottles);
    // console.log("availableBoxes", availableBoxes);
    return (
      <div>
        <CellarSchema
          bottles={realBottlesAndSelected}
          onSelect={this.onBoxSelect}
          selectableBoxes={availableBoxes}
        />
      </div>
    );
  }
}

export default CellsSelector;
