import React from 'react';
import { storiesOf } from '@storybook/react';
import MetaStep from './MetaStep';
import PictureStep from './PictureStep';
import TypesStep from './TypesStep';
import PositionStep from './PositionStep';
import AddSteps from './AddSteps';

storiesOf('Steps', module)
  .add('Full Stepper', () => <AddSteps />)
  .add('Meta', () => <MetaStep />)
  .add('Picture', () => <PictureStep />)
  .add('Types', () => <TypesStep />)
  .add('Position', () => <PositionStep />);
