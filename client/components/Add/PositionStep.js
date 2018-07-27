// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { PositionDescriptionConnected } from './Position/PositionDescription';
import PositionSelector from './Position/PositionSelector';
import { updateModel } from '~/client/store/';

type Props = {
  toggle: Function,
  model: { isInBoxes: boolean }
};
type State = {
  checked: boolean
};

export class PositionStep extends React.Component<Props, State> {
  render() {
    const { isInBoxes } = this.props.model;
    return (
      <React.Fragment>
        <label>
          <input
            onChange={this.props.toggle}
            type="checkbox"
            checked={isInBoxes}
          />
          Les bouteilles sont-elles dans les caisses?
        </label>
        {!isInBoxes && <PositionDescriptionConnected />}
        {isInBoxes && <PositionSelector />}
      </React.Fragment>
    );
  }
}

export const PositionStepConnected = connect(
  state => ({ model: state.adding.model }),
  {
    toggle() {
      return (dispatch, getState) => {
        dispatch(updateModel('isInBoxes', !getState().adding.model.isInBoxes));
      };
    }
  }
)(PositionStep);
