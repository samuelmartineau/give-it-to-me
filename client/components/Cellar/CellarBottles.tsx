import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Bottle from './Bottle';
import CellarCells from './Cells/CellarCells';
import { getBottleByPosition, RootState } from '../../store';
import { getCellId, getBottleInfos, getBottleId } from './utils';

const Cell: FC<PropsFromRedux> = ({ bottle }) => {
  if (!bottle) {
    return null;
  }
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

const connector = connect(
  (state: RootState, { boxId, cellId }: { boxId: number; cellId: number }) => ({
    bottle: getBottleByPosition(state, boxId, cellId),
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

const CellConnected = connector(Cell);

const CellarBottles = () => {
  return (
    <CellarCells>
      {(boxId, cellId) => {
        return (
          <CellConnected
            key={getCellId(boxId, cellId)}
            boxId={boxId}
            cellId={cellId}
          />
        );
      }}
    </CellarCells>
  );
};

export default CellarBottles;
