// @flow
import React from 'react';
import { connect } from 'react-redux';
import Bottle from '../Cellar/Bottle';
import { getWineBottles } from '~/client/store';
import { getBottleInfos, getBottleId } from '../Cellar/utils';

const Cell = ({ bottle }) => {
  const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
  return (
    <Bottle
      key={getBottleId(bottle.box, bottle.cell)}
      cx={bottleInfos.cx}
      cy={bottleInfos.cy}
      cell={bottle.cell}
      box={bottle.box}
      color={bottle.color}
    />
  );
};

export const CellarBottles = ({ bottles }) => {
  return (
    <g>
      {bottles.map(bottle => (
        <Cell bottle={bottle} />
      ))}
    </g>
  );
};

export default connect((state, { wineId }) => ({
  bottles: getWineBottles(state, wineId)
}))(CellarBottles);
