// @flow
import React from 'react';
import CellarBoxes from '../CellarBoxes';
import BoxCells from './BoxCells';

type Props = {
  children: Function
};

const CellarCells = ({ children = () => {} }: Props) => {
  return (
    <CellarBoxes>
      {boxId => (
        <BoxCells key={boxId} boxId={boxId}>
          {cellId => children(boxId, cellId)}
        </BoxCells>
      )}
    </CellarBoxes>
  );
};

export default CellarCells;
