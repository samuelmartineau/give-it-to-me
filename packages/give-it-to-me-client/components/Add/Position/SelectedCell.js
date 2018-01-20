// @flow
import React from 'react';
import Bottle from '../../Cellar/Bottle';
import { getBottleInfos } from '../../Cellar/utils';
import { cellar } from 'give-it-to-me-config';
import { range } from 'ramda';

const { CELLAR_SCHEMA } = cellar;
const boxes = range(0, CELLAR_SCHEMA.length);

type Props = {
  selectedCells: Array<any>
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
      bottle={{ cell: cellId, box: boxId }}
    />
  );
};

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { isCellSelected } from '../../../store';

export default compose(
  connect((state, { boxId, cellId }) => {
    return { selected: isCellSelected(state, boxId, cellId) };
  })
)(SelectedCell);
