import React from 'react';
import { storiesOf } from '@storybook/react';
import { array } from '@storybook/addon-knobs';
import BoxesSelector from './Boxes/BoxesSelector';
import CellsSelectors from './Cells/CellsSelectors';

storiesOf('Position', module)
  .add('Boxes Selector', () => <BoxesSelector />)
  .add('Cells selector', () => (
    <CellsSelectors selectedBoxes={array('selectedBoxes', [12], ',')} />
  ));
