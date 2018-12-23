// @flow
import React from 'react';
import BoxesSelector from './Boxes/BoxesSelector';
import CellSelector from './CellSelector';

export const Browse = () => {
  return (
    <React.Fragment>
      <BoxesSelector />
      <CellSelector />
    </React.Fragment>
  );
};
