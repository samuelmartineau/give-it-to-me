// @flow
import React from 'react';
import { connect } from 'react-redux';
import Bottle from '../Cellar/Bottle';
import { getBottleById } from '../../store';
import { getBottleInfos, getBottleId } from '../Cellar/utils';

const Cell = ({ bottle }) => {
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

const CellConnected = connect((state, { bottleId }) => ({
  bottle: getBottleById(state, bottleId)
}))(Cell);

export const CellarBottles = ({ bottles }) => {
  return (
    <g>
      {bottles.map(id => (
        <CellConnected key={id} bottleId={id} />
      ))}
    </g>
  );
};
