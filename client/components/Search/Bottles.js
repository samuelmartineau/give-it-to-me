// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Bottle from '../Cellar/Bottle';
import CellarCells from '../Cellar/Cells/CellarCells';
import { getBottleByPosition } from '../../store';
import { getCellId, getBottleInfos, getBottleId } from '../Cellar/utils';

const Cell = ({ bottle, boxId, cellId, wineId }) => {
  if (!bottle || bottle.wine_id !== wineId) {
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

const CellConnected = connect((state, { boxId, cellId }) => ({
  bottle: getBottleByPosition(state, boxId, cellId)
}))(Cell);

export const CellarBottles = ({ wineId }) => {
  return (
    <CellarCells>
      {(boxId, cellId) => {
        return (
          <CellConnected
            key={getCellId(boxId, cellId)}
            boxId={boxId}
            cellId={cellId}
            wineId={wineId}
          />
        );
      }}
    </CellarCells>
  );
};
