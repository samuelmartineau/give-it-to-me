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

const Cell = ({
  hasBottle,
  bottleColor,
  boxId,
  cellId
}: {
  hasBottle: boolean,
  bottleColor: string,
  boxId: number,
  cellId: number
}) => {
  if (!hasBottle) {
    return null;
  }
  const bottleInfos = getBottleInfos(boxId, cellId);
  return (
    <Bottle
      key={getBottleId(boxId, cellId)}
      cx={bottleInfos.cxRelative}
      cy={bottleInfos.cyRelative}
      cell={cellId}
      box={boxId}
      color={bottleColor}
    />
  );
};

const CellConnected = compose(
  connect((state, { boxId, cellId }) => {
    const bottle = getBottleByPosition(state, boxId, cellId);
    return {
      hasBottle: !!bottle,
      bottleColor: bottle && bottle.color
    };
  })
)(Cell);

export default BoxBottles;
