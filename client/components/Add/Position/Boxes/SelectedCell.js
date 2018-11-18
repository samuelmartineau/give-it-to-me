// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
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
      cx={bottleInfos.cx}
      cy={bottleInfos.cy}
      cell={cellId}
      box={boxId}
      color="blue"
    />
  );
};

export default compose(
  connect((state, { boxId, cellId }) => {
    return { selected: isCellSelected(state, boxId, cellId) };
  })
)(SelectedCell);
