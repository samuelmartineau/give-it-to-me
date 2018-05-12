import React from 'react';
import PositionDescription from './Position/PositionDescription';
import PositionSelector from './Position/PositionSelector';

export class PositionStep extends React.Component {
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
      <React.Fragment>
        <label>
          <input onChange={this.toggleMode} type="checkbox" checked={checked} />
          Les bouteilles sont-elles dans les caisses?
        </label>
        {checked && <PositionDescription />}
        {!checked && <PositionSelector />}
      </React.Fragment>
    );
  }
}
