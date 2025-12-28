import React from 'react';
import config from '~/config';

const { ZONE_A_SCHEMA, ZONE_B_SCHEMA, CANVAS_WIDTH, CANVAS_HEIGHT } =
  config.cellar;

type Props = {
  children: any;
};

const CellarContainer = ({ children }: Props) => {
  return (
    <svg data-e2e="cellar" viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}>
      <text x="6" y="6" fill="black" font-size="5">
        {ZONE_B_SCHEMA.label}
      </text>
      <text x="6" y="80" fill="black" font-size="5">
        {ZONE_A_SCHEMA.label}
      </text>
      {children}
    </svg>
  );
};

export default CellarContainer;
