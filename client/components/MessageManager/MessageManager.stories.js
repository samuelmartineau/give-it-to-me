import React from 'react';
import { storiesOf } from '@storybook/react';
import MessageManager from './MessageManager';

storiesOf('MessageManager', module)
  .add('Empty favorites', () => (
    <MessageManager
      icon="favorite"
      title="Aucun favori pour le moment"
      message="Pour ajouter des favoris il te suffit de faire une recherche et de cliquer sur le petit coeur dans la carte"
    />
  ))
  .add('Empty search', () => (
    <MessageManager
      icon="search"
      title="Aucun vin trouvé"
      message="Impossible de trouver un vin. Peut être que tu as mis trop de filtres?"
    />
  ));
