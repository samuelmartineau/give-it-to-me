// @flow
import React from 'react';
import { cellar } from 'give-it-to-me-config';
import { range } from 'ramda';
import { getBoxCells } from '../utils';

const { CELLAR_SCHEMA } = cellar;
const boxes = range(0, CELLAR_SCHEMA.length);

type Props = {
  children: Function
};

const Cells = ({ children = () => {} }: Props) => {
  return (
    <g>
      {boxes.map(boxId => {
        const cells = getBoxCells(boxId);
        return cells.map(cellId => children(boxId, cellId));
      })}
    </g>
  );
};

export default Cells;
