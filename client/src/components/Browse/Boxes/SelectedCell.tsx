import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Bottle from '~/client/components/Cellar/Bottle';
import { getBottleInfos } from '~/client/components/Cellar/utils';
import { RootState } from '~/client/store';

type RawProps = {
  boxId: number;
  cellId: number;
};

type Props = PropsFromRedux & RawProps;

const SelectedCell: FC<Props> = ({ selected = false, boxId, cellId }) => {
  if (!selected) {
    return null;
  }
  const bottleInfos = getBottleInfos(boxId, cellId);
  return (
    <Bottle
      cx={bottleInfos.cx}
      cy={bottleInfos.cy}
      cell={cellId}
      box={boxId}
      color="blue"
    />
  );
};

const connector = connect((state: RootState, { boxId, cellId }: RawProps) => {
  return {
    selected: state.browse.boxId === boxId && state.browse.cellId === cellId,
  };
});

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SelectedCell);
