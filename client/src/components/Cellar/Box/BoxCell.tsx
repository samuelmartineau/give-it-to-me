import React, { FC } from 'react';
import { cellar } from '~/config';

const { CELL_SIZE, CELL_BORDER_SIZE, BOX_BORDER_COLOR, BOX_COLOR } = cellar;

type Props = {
  cellId: number;
  onSelect?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  className?: string;
};

const BoxCell: FC<Props> = ({ cellId, onSelect = () => {}, className }) => {
  const column = Math.floor(cellId / 3);
  const row = cellId % 3;
  return (
    <rect
      className={className}
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
