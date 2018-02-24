import React from 'react';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import PositionDescription from './Position/PositionDescription';
import PositionSelector from './Position/PositionSelector';

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
        {!checked && <PositionSelector />}
      </div>
    );
  }
}

export default PositionStep;
