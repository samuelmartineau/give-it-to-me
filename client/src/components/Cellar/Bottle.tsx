import React from 'react';
import config from '~/config';

const { CELL_SIZE } = config.cellar;

import { getBottleInfos } from './utils';

type Props = {
  box: number;
  cell: number;
  color: string;
  cx: number;
  cy: number;
  deleted: boolean;
};

const Bottle = ({ box, cell, color, deleted, ...rest }: Props) => {
  const bottleInfos = getBottleInfos(box, cell);
  const x = bottleInfos.cx - CELL_SIZE / 2;
  const y = bottleInfos.cy - CELL_SIZE / 2;

  return (
    <>
      <circle
        r={bottleInfos.radius}
        fill={deleted ? 'black' : color}
        pointerEvents="none"
        {...rest}
      />
      {deleted && (
        <>
          <line
            x1={x}
            y1={y}
            x2={x + CELL_SIZE}
            y2={y + CELL_SIZE}
            stroke="red"
            stroke-width="0.5"
          />
          <line
            x1={x}
            y1={y + CELL_SIZE}
            x2={x + CELL_SIZE}
            y2={y}
            stroke="red"
            stroke-width="0.5"
          />
        </>
      )}
    </>
  );
};

export default Bottle;
