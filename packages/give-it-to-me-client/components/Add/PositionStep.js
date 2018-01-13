import React from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import PositionDescription from './Position/PositionDescription';
import BoxesSelector from './Position/BoxesSelector';
import CellsSelectorsConnected from './Position/CellsSelectorsConnected';

class PositionStep extends React.Component {
  state = {
    checked: false
  };

  toggleMode = () => {
    this.setState(state => ({
      checked: !state.checked
    }));
  };
  render() {
    const { checked } = this.state;
    return (
      <div>
        <FormControlLabel
          control={<Switch checked={checked} onChange={this.toggleMode} />}
          label="Les bouteilles sont-elles dans les caisses?"
        />
        {checked && <PositionDescription />}
        {!checked && (
          <div>
            <BoxesSelector />
            <CellsSelectorsConnected />
          </div>
        )}
      </div>
    );
  }
}

export default PositionStep;
