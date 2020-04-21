import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { isCellSelected, RootState } from '~/client/store';
import Bottle from '~/client/components/Cellar/Bottle';
import { getBottleInfos } from '~/client/components/Cellar/utils';

type RawProps = {
  boxId: number;
  cellId: number;
};

type Props = RawProps & PropsFromRedux;

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

const connector = connect((state: RootState, { boxId, cellId }: RawProps) => ({
  selected: isCellSelected(state, boxId, cellId),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SelectedCell);
