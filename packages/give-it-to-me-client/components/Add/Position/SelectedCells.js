// @flow
import React from 'react';
import Bottle from '../../Cellar/Bottle';
import { getBottleInfos, getCellId, getBoxCells } from '../../Cellar/utils';
import { cellar } from 'give-it-to-me-config';
import { range } from 'ramda';
import SelectedCell from './SelectedCell';

const { CELLAR_SCHEMA } = cellar;
const boxes = range(0, CELLAR_SCHEMA.length);

type Props = {
  selectedCells: Array<any>
};

const SelectedCells = ({ selectedCells = [] }: Props) => {
  console.log('SelectedCells');
  return (
    <g>
      {boxes.map(boxId => {
        const cells = getBoxCells(boxId);
        return cells.map(cellId => (
          <SelectedCell
            key={getCellId(boxId, cellId)}
            boxId={boxId}
            cellId={cellId}
          />
        ));
      })}
    </g>
  );
};

export default SelectedCells;
