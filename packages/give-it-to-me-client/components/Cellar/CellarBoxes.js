// @flow
import React from 'react';
import { cellar } from 'give-it-to-me-config';
import { range } from 'ramda';

const { CELLAR_SCHEMA } = cellar;

type Props = {
  children: any
};

const CellarBoxes = ({ children }: Props) => {
  return <g>{range(0, CELLAR_SCHEMA.length).map(boxId => children(boxId))}</g>;
};

export default CellarBoxes;
