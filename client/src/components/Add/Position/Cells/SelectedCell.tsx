import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { isCellSelected, RootState } from '@/store';
import Bottle from '@/components/Cellar/Bottle';
import { getBottleInfos } from '@/components/Cellar/utils';

type RawProps = {
  boxId: number;
  cellId: number;
};

type Props = RawProps & PropsFromRedux;

const SelectedCell = ({ selected = false, boxId, cellId }: Props) => {
  if (!selected) {
    return null;
  }
  const bottleInfos = getBottleInfos(boxId, cellId);
  return (
    <Bottle
      cx={bottleInfos.cxRelative}
      cy={bottleInfos.cyRelative}
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
