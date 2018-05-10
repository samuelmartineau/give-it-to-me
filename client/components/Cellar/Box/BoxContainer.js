// @flow
import React from 'react';
import { cellar } from '~/config';

const { CELL_SIZE, CELLAR_SCHEMA, FULL_BOX_WIDTH_CELLS } = cellar;

type Props = {
  children: any,
  boxId: number
};

const BoxContainer = ({ boxId, children }: Props) => {
  const box = CELLAR_SCHEMA[boxId];
  const canvasWidth = box.schema[0] * CELL_SIZE;
  const canvasHeigh = box.schema[1] * CELL_SIZE;
  return (
    <svg
      style={{ width: '100%', height: '100%' }}
      width={FULL_BOX_WIDTH_CELLS * CELL_SIZE}
      height={canvasHeigh}
      viewBox={`0 0 ${canvasWidth} ${canvasHeigh}`}
    >
      {children}
    </svg>
  );
};

export default BoxContainer;
