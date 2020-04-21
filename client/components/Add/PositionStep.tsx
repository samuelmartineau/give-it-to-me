import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { PositionDescriptionConnected } from './Position/PositionDescription';
import PositionSelector from './Position/PositionSelector';
import { updateModel, RootState } from '~/client/store/';
import { Checkbox } from '~/client/components/Toolkit';
import { Dispatch } from 'redux';

type Props = PropsFromRedux;

export const PositionStep: FC<Props> = ({ isInBoxes, toggle }) => {
  return (
    <>
      <Checkbox
        onChange={toggle}
        id="inBoxes"
        name="inBoxes"
        value="inBoxes"
        checked={isInBoxes}
      >
        Les bouteilles sont-elles dans les caisses?
      </Checkbox>
      {!isInBoxes && <PositionDescriptionConnected />}
      {isInBoxes && <PositionSelector />}
    </>
  );
};

const connector = connect(
  (state: RootState) => ({ isInBoxes: state.adding.model.isInBoxes }),
  {
    toggle() {
      return (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(
          updateModel({
            name: 'isInBoxes',
            value: !getState().adding.model.isInBoxes,
          })
        );
      };
    },
  }
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const PositionStepConnected = connector(PositionStep);
