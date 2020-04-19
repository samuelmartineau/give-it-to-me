import React from 'react';
import { connect } from 'react-redux';
import Bottle from '~/client/components/Cellar/Bottle';
import { getBottleInfos } from '~/client/components/Cellar/utils';

type Props = {
  selected: boolean;
  boxId: number;
  cellId: number;
};

const SelectedCell = ({ selected = false, boxId, cellId }: Props) => {
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

export default connect((state, { boxId, cellId }) => {
  return {
    selected: state.browse.boxId === boxId && state.browse.cellId === cellId,
  };
})(SelectedCell);
