// @flow
import React from 'react';
import Bottle from '../../Cellar/Bottle';
import { getBottleInfos, getCellId } from '../../Cellar/utils';

type Props = {
  selectedCells: Array<any>
};

const SelectedCells = ({ selectedCells = [] }: Props) => {
  console.log('SelectedCells');
  return (
    <g>
      {selectedCells.map(bottle => {
        const bottleInfos = getBottleInfos(bottle.box, bottle.cell);
        return (
          <Bottle
            key={getCellId(bottle.box, bottle.cell)}
            cx={bottleInfos.cx}
            cy={bottleInfos.cy}
            bottle={bottle}
          />
        );
      })}
    </g>
  );
};

export default SelectedCells;
