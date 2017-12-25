import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { array } from '@storybook/addon-knobs';
import BoxesSelector from './BoxesSelector';
import BoxesSelectorConnected from './BoxesSelectorConnected';
import CellsSelector from './CellsSelector';
import CellsSelectorConnected from './CellsSelectorConnected';

storiesOf('Position', module)
  .add('Boxes Selector', () => (
    <BoxesSelector
      bottles={[]}
      selectedBottles={[]}
      onSelect={action('on-select')}
    />
  ))
  .add('Boxes Selector Connected', () => <BoxesSelectorConnected />)
  .add('Cells selector', () => (
    <CellsSelector selectedBoxes={array('selectedBoxes', [12], ',')} />
  ))
  .add('Cells selector Connected', () => <CellsSelectorConnected />);
