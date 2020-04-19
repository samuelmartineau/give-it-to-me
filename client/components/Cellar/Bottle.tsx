import React from 'react';

import { getBottleInfos } from './utils';

type Props = {
  box: number;
  cell: number;
  color: string;
  cx: number;
  cy: number;
};

const Bottle = ({ box, cell, color, ...rest }: Props) => {
  const bottleInfos = getBottleInfos(box, cell);
  return (
    <circle
      r={bottleInfos.radius}
      fill={color}
      pointerEvents="none"
      {...rest}
    />
  );
};

export default Bottle;
