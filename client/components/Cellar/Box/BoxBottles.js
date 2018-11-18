// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Bottle from '../Bottle';
import BoxCells from '../Cells/BoxCells';
import { getBottleByPosition } from '../../../store';
import { getCellId, getBottleInfos, getBottleId } from '../utils';

const BoxBottles = ({ boxId }: { boxId: number }) => {
  return (
    <g>
      <BoxCells boxId={boxId}>
        {cellId => {
          return (
            <CellConnected
              key={getCellId(boxId, cellId)}
              boxId={boxId}
              cellId={cellId}
            />
          );
        }}
      </BoxCells>
    </g>
  );
};

export default BoxBottles;

const Cell = ({ bottle, boxId, cellId }) => {
  if (!bottle) {
    return null;
  }
  const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
  return (
    <Bottle
      key={getBottleId(bottle.box, bottle.cell)}
      cx={bottleInfos.cxRelative}
      cy={bottleInfos.cyRelative}
      bottle={bottle}
    />
  );
};

const CellConnected = compose(
  connect((state, { boxId, cellId }) => ({
    bottle: getBottleByPosition(state, boxId, cellId)
  }))
)(Cell);
