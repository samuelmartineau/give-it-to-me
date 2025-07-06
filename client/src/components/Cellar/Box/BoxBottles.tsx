import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Bottle from '../Bottle';
import BoxCells from '../Cells/BoxCells';
import { getBottleByPosition, RootState } from '../../../store';
import { getCellId, getBottleInfos, getBottleId } from '../utils';

const BoxBottles: FC<{ boxId: number }> = ({ boxId }) => {
  return (
    <g>
      <BoxCells boxId={boxId}>
        {(cellId) => {
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

type RawProps = {
  boxId: number;
  cellId: number;
};

type Props = PropsFromRedux & RawProps;

const Cell: FC<Props> = ({ hasBottle, bottleColor, boxId, cellId }) => {
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

const connector = connect((state: RootState, { boxId, cellId }: RawProps) => {
  const bottle = getBottleByPosition(state, boxId, cellId);
  if (bottle) {
    return {
      hasBottle: true as const,
      bottleColor: bottle.color,
    };
  }
  return {
    hasBottle: false as const,
  };
});

type PropsFromRedux = ConnectedProps<typeof connector>;

const CellConnected = connector(Cell);

export default BoxBottles;
