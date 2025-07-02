import React from 'react';
import config from '~/config';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = config.cellar;

type Props = {
  children: any;
};

const CellarContainer = ({ children }: Props) => {
  return (
    <svg data-e2e="cellar" viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}>
      {children}
    </svg>
  );
};

export default CellarContainer;
