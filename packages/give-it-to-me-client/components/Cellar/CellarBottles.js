// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Bottle from './Bottle';
import Cells from './Cells/Cells';
import { getBottleByPosition } from '../../store';
import { getCellId, getBottleInfos, getBottleId } from './utils';

const CellarBottles = () => {
  return (
    <Cells>
      {(boxId, cellId) => {
        return (
          <CellConnected
            key={getCellId(boxId, cellId)}
            boxId={boxId}
            cellId={cellId}
          />
        );
      }}
    </Cells>
  );
};

export default CellarBottles;

const Cell = ({ bottle, boxId, cellId }) => {
  if (!bottle) {
    return null;
  }
  const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
  return (
    <Bottle
      key={getBottleId(bottle.box, bottle.cell)}
      cx={bottleInfos.cx}
      cy={bottleInfos.cy}
      bottle={bottle}
    />
  );
};

const CellConnected = compose(
  connect((state, { boxId, cellId }) => ({
    bottle: getBottleByPosition(state, boxId, cellId)
  }))
)(Cell);
