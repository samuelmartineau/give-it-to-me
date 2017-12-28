import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { array } from '@storybook/addon-knobs';
import BoxesSelector from './BoxesSelector';
import BoxesSelectorConnected from './BoxesSelectorConnected';
import CellsSelectors from './CellsSelectors';
import CellsSelectorsConnected from './CellsSelectorsConnected';

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
    <CellsSelectors selectedBoxes={array('selectedBoxes', [12], ',')} />
  ))
  .add('Cells selector Connected', () => <CellsSelectorsConnected />);
