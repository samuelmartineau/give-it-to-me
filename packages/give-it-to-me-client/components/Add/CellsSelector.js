import React from "react";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import Switch from "material-ui/Switch";
import CellarSchema from "../Cellar/CellarSchema";
import { getAvailableBoxes } from "../Cellar/utils";

class CellsSelector extends React.Component {
  state = {
    checked: false,
    selection: {}
  };

  toggleMode = () => {
    this.setState(state => ({
      checked: !state.checked
    }));
  };
  render() {
    const { bottles } = this.props;
    const availableBoxes = getAvailableBoxes(bottles);
    console.log("availableBoxes", availableBoxes);
    return (
      <div>
        <CellarSchema
          bottles={bottles}
          onSelect={console.log}
          selectableBoxes={availableBoxes}
        />
      </div>
    );
  }
}

export default CellsSelector;
