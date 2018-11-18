// @flow
import React from 'react';
import { connect } from 'react-redux';
import { isCellSelected } from '../../../../store';
import Bottle from '../../../Cellar/Bottle';
import { getBottleInfos } from '../../../Cellar/utils';

type Props = {
  selected: boolean,
  boxId: number,
  cellId: number
};

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

export default connect((state, { boxId, cellId }) => {
  return { selected: isCellSelected(state, boxId, cellId) };
})(SelectedCell);
