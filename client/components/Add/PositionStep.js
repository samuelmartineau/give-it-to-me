// @flow

import * as React from 'react';
import { PositionDescription } from './Position/PositionDescription';
import PositionSelector from './Position/PositionSelector';

type Props = {
  onChange: Function
};
type State = {
  checked: boolean
};

export class PositionStep extends React.Component<Props, State> {
  state = {
    checked: true
  };

  toggleMode = () => {
    this.props.onChange('isInBoxes', !this.state.checked);
    this.setState(state => ({
      checked: !state.checked
    }));
  };
  render() {
    const { checked } = this.state;
    const { onChange } = this.props;
    return (
      <React.Fragment>
        <label>
          <input onChange={this.toggleMode} type="checkbox" checked={checked} />
          Les bouteilles sont-elles dans les caisses?
        </label>
        {!checked && <PositionDescription onChange={onChange} />}
        {checked && <PositionSelector />}
      </React.Fragment>
    );
  }
}
