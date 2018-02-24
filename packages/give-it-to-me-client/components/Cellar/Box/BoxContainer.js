// @flow
import React from 'react';
import { range } from 'ramda';
import { cellar } from 'give-it-to-me-config';

const { CELL_SIZE, CELLAR_SCHEMA, FULL_BOX_WIDTH_CELLS } = cellar;

type Props = {
  children: Function,
  boxId: number
};

const BoxContainer = ({ boxId, children }: Props) => {
  const box = CELLAR_SCHEMA[boxId];
  const canvasWidth = box.schema[0] * CELL_SIZE;
  const canvasHeigh = box.schema[1] * CELL_SIZE;
  return (
    <svg
      style={{
        width: '100%',
        height: '100%'
      }}
      width={FULL_BOX_WIDTH_CELLS * CELL_SIZE}
      height={canvasHeigh}
      viewBox={`0 0 ${canvasWidth} ${canvasHeigh}`}
    >
      <g>
        {range(0, box.schema[0] * box.schema[1]).map(cellId =>
          children(cellId)
        )}
      </g>
    </svg>
  );
};

export default BoxContainer;
