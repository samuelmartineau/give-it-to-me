// @flow
import React from 'react';
import { cellar } from 'give-it-to-me-config';
import classNames from 'classnames';

const { CELL_SIZE, CELL_BORDER_SIZE, BOX_BORDER_COLOR, BOX_COLOR } = cellar;

type Props = {
  cellId: number,
  onSelect: Function,
  classes: {}
};

const BoxCell = ({ cellId, onSelect = () => {}, classes = {} }: Props) => {
  const column = Math.floor(cellId / 3);
  const row = cellId % 3;
  return (
    <rect
      className={classNames(Object.values(classes))}
      onClick={onSelect}
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
