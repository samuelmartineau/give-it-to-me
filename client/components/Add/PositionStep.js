// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { PositionDescriptionConnected } from './Position/PositionDescription';
import PositionSelector from './Position/PositionSelector';
import { updateModel } from '~/client/store/';
import { Checkbox } from '~/client/components/Toolkit';

type Props = {
  toggle: Function,
  isInBoxes: boolean
};
type State = {
  checked: boolean
};

export class PositionStep extends React.Component<Props, State> {
  render() {
    const { isInBoxes, toggle } = this.props;
    return (
      <React.Fragment>
        <Checkbox
          onChange={toggle}
          id="inBoxes"
          type="checkbox"
          name="inBoxes"
          value="inBoxes"
          checked={isInBoxes}
        >
          Les bouteilles sont-elles dans les caisses?
        </Checkbox>
        {!isInBoxes && <PositionDescriptionConnected />}
        {isInBoxes && <PositionSelector />}
      </React.Fragment>
    );
  }
}

export const PositionStepConnected = connect(
  state => ({ isInBoxes: state.adding.model.isInBoxes }),
  {
    toggle() {
      return (dispatch, getState) => {
        dispatch(updateModel('isInBoxes', !getState().adding.model.isInBoxes));
      };
    }
  }
)(PositionStep);
