import React, { FC } from 'react';
import { getBoxCells } from '../utils';

type Props = {
  boxId: number;
  children: (cellId: number) => React.ReactNode;
};

const BoxCells: FC<Props> = ({ boxId, children }) => {
  const cells = getBoxCells(boxId);
  return <>{cells.map((cellId) => children(cellId))}</>;
};

export default BoxCells;
