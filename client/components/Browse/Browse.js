// @flow
import React from 'react';
import BoxesSelector from './Boxes/BoxesSelector';
import CellSelector from './Cell/CellSelector';
import WineWizard from './WineWizard';

export const Browse = () => {
  return (
    <React.Fragment>
      <BoxesSelector />
      <CellSelector />
      <WineWizard />
    </React.Fragment>
  );
};
