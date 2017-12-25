import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BoxesSelector from './BoxesSelector';
import CellsSelector from './CellsSelector';

storiesOf('Position', module)
  .add('Boxes selector', () => <BoxesSelector />)
  .add('Cells selector', () => <CellsSelector />);
