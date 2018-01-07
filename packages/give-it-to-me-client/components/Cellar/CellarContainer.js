// @flow
import React from 'react';
import { cellar } from 'give-it-to-me-config';

const { CANVAS_WIDTH, CANVAS_HEIGHT } = cellar;

type Props = {
  children: any
};

const CellarContainer = ({ children }: Props) => {
  return <svg viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}>{children}</svg>;
};

export default CellarContainer;
