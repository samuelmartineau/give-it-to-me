// @flow
import React from 'react';
import styled from 'styled-components';
import { cellar } from '~/config';

const Svg = styled.svg`
  width: 100%;
  height: auto;
`;

const { CELL_SIZE, CELLAR_SCHEMA, FULL_BOX_WIDTH_CELLS } = cellar;

type Props = {
  children: any,
  boxId: number
};

const BoxContainer = ({ boxId, children }: Props) => {
  const box = CELLAR_SCHEMA[boxId];
  const canvasWidth = box.schema[0] * CELL_SIZE;
  const canvasHeigh = box.schema[1] * CELL_SIZE;
  return (
    <Svg
      width={FULL_BOX_WIDTH_CELLS * CELL_SIZE}
      height={canvasHeigh}
      viewBox={`0 0 ${canvasWidth} ${canvasHeigh}`}
    >
      {children}
    </Svg>
  );
};

export default BoxContainer;
