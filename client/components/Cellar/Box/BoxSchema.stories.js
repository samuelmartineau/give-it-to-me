import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BoxContainer from './BoxContainer';
import BoxCell from './BoxCell';

storiesOf('BoxSchema', module).add('Presentation', () => (
  <BoxContainer boxId="25">
    {cellId => <BoxCell key={cellId} boxId="25" cellId={cellId} />}
  </BoxContainer>
));
