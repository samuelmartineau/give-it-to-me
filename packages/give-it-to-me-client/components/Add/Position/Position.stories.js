import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BoxesSelector from './BoxesSelector';
import BoxesSelectorConnected from './BoxesSelectorConnected';
import CellsSelector from './CellsSelector';

storiesOf('Position', module)
  .add('Boxes Selector', () => (
    <BoxesSelector
      bottles={[]}
      selectedBottles={[]}
      onSelect={action('on-select')}
    />
  ))
  .add('Boxes Selector Connected', () => <BoxesSelectorConnected />)
  .add('Cells selector', () => <CellsSelector />);
