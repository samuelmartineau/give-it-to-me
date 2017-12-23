import React from 'react';
import { storiesOf } from '@storybook/react';
import MessageManager from './MessageManager';
import FavoriteBorder from 'material-ui-icons/FavoriteBorder';

storiesOf('MessageManager', module).add('Empty favorites', () => (
  <MessageManager
    icon={<FavoriteBorder />}
    title="Aucun favori pour le moment"
    message="Pour ajouter des favoris il te suffit de faire une recherche et de cliquer sur le petit coeur dans la carte"
  />
));
