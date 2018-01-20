// @flow
import React from 'react';
import Bottle from './Bottle';
import { getBottleInfos, getBottleId } from './utils';

type Props = {
  bottles: Array<any>
};

const CellarBottles = ({ bottles = [] }: Props) => {
  return (
    <g>
      {bottles.map(bottle => {
        const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
        return (
          <Bottle
            key={getBottleId(bottle.box, bottle.cell)}
            cx={bottleInfos.cx}
            cy={bottleInfos.cy}
            bottle={bottle}
          />
        );
      })}
    </g>
  );
};

export default CellarBottles;
