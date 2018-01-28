// @flow
import React from 'react';
import { range } from 'ramda';
import { cellar } from 'give-it-to-me-config';

const {
  CELL_SIZE,
  CELLAR_SCHEMA,
  CELL_BORDER_SIZE,
  BOX_BORDER_COLOR,
  BOX_COLOR
} = cellar;

type Props = {
  cellId: number,
  boxId: number
};

const BoxCell = ({ boxId, cellId }: Props) => {
  const column = Math.floor(cellId / 3);
  const row = cellId % 3;
  return (
    <rect
      x={column * CELL_SIZE}
      y={row * CELL_SIZE}
      width={CELL_SIZE}
      height={CELL_SIZE}
      strokeWidth={CELL_BORDER_SIZE}
      stroke={BOX_BORDER_COLOR}
      fill={BOX_COLOR}
    />
  );
};

export default BoxCell;
