import React, { FC } from 'react';
import config from '~/config';

const { CELLAR_SCHEMA } = config.cellar;

type Props = {
  children: (boxId: number) => React.ReactNode;
};

const CellarBoxes: FC<Props> = ({ children }) => {
  return (
    <g>{Object.keys(CELLAR_SCHEMA).map((id) => children(parseInt(id)))}</g>
  );
};

export default CellarBoxes;
