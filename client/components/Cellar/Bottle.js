// @flow
import React from 'react';

import { getBottleInfos } from './utils';

type Props = {
  bottle: {
    box: number,
    cell: number,
    color: string
  }
};

const Bottle = ({ bottle, ...rest }: Props) => {
  const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
  return (
    <circle
      r={bottleInfos.radius}
      fill={bottle.color}
      pointerEvents="none"
      {...rest}
    />
  );
};

export default Bottle;
