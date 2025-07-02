import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  isCellSelected,
  isCellSelectable,
  selectCell,
  unselectCell,
  RootState,
} from '@/store';
import BoxCell from '@/components/Cellar/Box/BoxCell';
import BoxCellSelectable from '@/components/Cellar/Box/BoxCellSelectable';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const SelectableCell = connect(
  null,
  (dispatch, { boxId, cellId }: RawProps) => ({
    onSelect: () => {
      dispatch(selectCell(boxId, cellId));
    },
  })
)(BoxCellSelectable);

const UnSelectableCell = connect(
  null,
  (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    { boxId, cellId }: RawProps
  ) => ({
    onSelect: () => {
      dispatch(unselectCell(boxId, cellId));
    },
  })
)(BoxCellSelectable);

type RawProps = {
  boxId: number;
  cellId: number;
};

type Props = RawProps & PropsFromRedux;

const ClickHandlerCell: FC<Props> = ({
  isCellSelected,
  isCellSelectable,
  boxId,
  cellId,
}) => {
  if (isCellSelected) {
    return <UnSelectableCell boxId={boxId} cellId={cellId} />;
  } else if (isCellSelectable) {
    return <SelectableCell boxId={boxId} cellId={cellId} />;
  }
  return <BoxCell cellId={cellId} />;
};

const connector = connect((state: RootState, { boxId, cellId }: RawProps) => ({
  isCellSelected: isCellSelected(state, boxId, cellId),
  isCellSelectable: isCellSelectable(state, boxId, cellId),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ClickHandlerCell);
