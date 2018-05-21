import React from 'react';
import { storiesOf } from '@storybook/react';
import { MetaStepConnected } from './MetaStep';
import { PictureStepConnected } from './PictureStep';
import { TypesStepConnected } from './TypesStep';
import { PositionStepConnected } from './PositionStep';
import { AddStepsConnected } from './AddSteps';

storiesOf('Steps', module)
  .add('Full Stepper', () => <AddStepsConnected />)
  .add('Meta', () => <MetaStepConnected />)
  .add('Picture', () => <PictureStepConnected />)
  .add('Types', () => <TypesStepConnected />)
  .add('Position', () => <PositionStepConnected />);
