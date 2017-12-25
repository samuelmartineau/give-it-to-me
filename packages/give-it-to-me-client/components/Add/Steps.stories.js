import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MetaStep from './MetaStep';
import PictureStep from './PictureStep';
import TypesStep from './TypesStep';
import PositionStep from './PositionStep';

storiesOf('Steps', module)
  .add('Meta', () => <MetaStep />)
  .add('Picture', () => <PictureStep />)
  .add('Types', () => <TypesStep />)
  .add('Position', () => <PositionStep />);
