import React from "react";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import Switch from "material-ui/Switch";

class PositionStep extends React.Component {
  render() {
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              onChange={(event, checked) =>
                this.setState({ checkedA: checked })
              }
            />
          }
          label="Les bouteilles sont-elles dans les caisses?"
        />
      </div>
    );
  }
}

export default PositionStep;
