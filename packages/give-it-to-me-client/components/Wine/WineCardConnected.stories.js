import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import WineCardConnected from './WineCardConnected';

storiesOf('WineCard', module).add('Connected', () => (
  <WineCardConnected wineId={10}>{wine => wine.name}</WineCardConnected>
));
