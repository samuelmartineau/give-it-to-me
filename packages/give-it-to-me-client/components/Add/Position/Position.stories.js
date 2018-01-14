import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { array } from '@storybook/addon-knobs';
import BoxesSelector from './BoxesSelector';
import CellsSelectors from './CellsSelectors';

storiesOf('Position', module)
  .add('Boxes Selector', () => <BoxesSelector />)
  .add('Cells selector', () => (
    <CellsSelectors selectedBoxes={array('selectedBoxes', [12], ',')} />
  ));
