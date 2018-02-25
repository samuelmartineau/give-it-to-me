// @flow
import React from 'react';
import { cellar } from 'give-it-to-me-config';
import { range } from 'ramda';
import { getBoxCells } from '../utils';

const { CELLAR_SCHEMA } = cellar;
const boxes = range(0, CELLAR_SCHEMA.length);

type Props = {
  boxId: number,
  children: Function
};

const BoxCells = ({ boxId, children = () => {} }: Props) => {
  const cells = getBoxCells(boxId);
  return cells.map(cellId => children(cellId));
};

export default BoxCells;
