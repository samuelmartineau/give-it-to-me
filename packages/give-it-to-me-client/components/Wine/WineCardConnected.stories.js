import React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import WineCardConnected from './WineCardConnected';

storiesOf('WineCard', module).add('Connected', () => (
  <WineCardConnected wineId={number('wineId', 100)}>
    {wine => JSON.stringify(wine, null, 2)}
  </WineCardConnected>
));
