// @flow
import React from 'react';
import { connect } from 'react-redux';
import { hasNoResult } from '~/client/store/';
import { MessageManager } from '../MessageManager/MessageManager';

type Props = {};

const EmptyResults = ({ hasNoResult }) => {
  if (hasNoResult) {
    return (
      <MessageManager
        icon="search"
        title="Aucun vin trouvé"
        message="Impossible de trouver un vin. Peut être que tu as mis trop de filtres?"
      />
    );
  }
  return null;
};

export const EmptyResultsConnected = connect(state => ({
  hasNoResult: hasNoResult(state)
}))(EmptyResults);
