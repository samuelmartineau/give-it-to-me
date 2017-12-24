import React from 'react';
import { storiesOf } from '@storybook/react';
import CellarSchemaPresentation from './CellarSchemaPresentation';

storiesOf('CellarSchemaPresentation', module).add(
  'Cellar connected to store',
  () => <CellarSchemaPresentation />
);
