import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  isBoxSelected,
  isBoxSelectable,
  selectBox,
  unselectBox,
  RootState,
} from '~/client/store';
import CellarBox from '~/client/components/Cellar/CellarBox';
import CellarBoxSelectable from '~/client/components/Cellar/CellarBoxSelectable';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const SelectableBox = connect(
  null,
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
    onSelect: (boxId) => {
      dispatch(selectBox(boxId));
    },
  })
)(CellarBoxSelectable);

const UnSelectableBox = connect(
  null,
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
    onSelect: (boxId) => {
      dispatch(unselectBox(boxId));
    },
  })
)(CellarBoxSelectable);

type RawProps = {
  boxId: number;
};

type Props = RawProps & PropsFromRedux;

const ClickHandlerBox: FC<Props> = ({
  isBoxSelected,
  isBoxSelectable,
  boxId,
}) => {
  if (isBoxSelected) {
    return <UnSelectableBox boxId={boxId} />;
  } else if (isBoxSelectable) {
    return <SelectableBox boxId={boxId} />;
  }
  return <CellarBox boxId={boxId} />;
};

const connector = connect((state: RootState, { boxId }: RawProps) => ({
  isBoxSelected: isBoxSelected(state, boxId),
  isBoxSelectable: isBoxSelectable(state, boxId),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ClickHandlerBox);
