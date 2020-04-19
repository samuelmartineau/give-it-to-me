import React from 'react';
import { boxes } from './utils';

type Props = {
  children: Function;
};

const CellarBoxes = ({ children }: Props) => {
  return <g>{boxes.map((boxId) => children(boxId))}</g>;
};

export default CellarBoxes;
