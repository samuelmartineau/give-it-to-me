import React, { FC } from 'react';
import { boxes } from './utils';

type Props = {
  children: (boxId: number) => React.ReactNode;
};

const CellarBoxes: FC<Props> = ({ children }) => {
  return <g>{boxes.map((boxId) => children(boxId))}</g>;
};

export default CellarBoxes;
