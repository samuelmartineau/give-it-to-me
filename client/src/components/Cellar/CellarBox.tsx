import React, { FC } from 'react';
import config from '~/config';

const { CELLAR_SCHEMA, BOX_BORDER_SIZE, BOX_BORDER_COLOR, BOX_COLOR } = config.cellar;

type Props = {
  boxId: number;
  onSelect?: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
  className?: string;
};

const CellarBox: FC<Props> = ({ boxId, onSelect, className }) => {
  const box = CELLAR_SCHEMA[boxId];
  return (
    <rect
      data-id={boxId}
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
