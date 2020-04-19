import React from 'react';
import { cellar } from '~/config';

const { CELLAR_SCHEMA, BOX_BORDER_SIZE, BOX_BORDER_COLOR, BOX_COLOR } = cellar;

type Props = {
  boxId: number;
  onSelect?: Function;
  className: string;
};

const CellarBox = ({ boxId, onSelect, className }: Props) => {
  const box = CELLAR_SCHEMA[boxId];
  return (
    <rect
      className={className}
      onClick={onSelect}
      x={box.x}
      y={box.y}
      width={box.width}
      height={box.height}
      strokeWidth={BOX_BORDER_SIZE}
      stroke={BOX_BORDER_COLOR}
      fill={BOX_COLOR}
    />
  );
};

export default CellarBox;
