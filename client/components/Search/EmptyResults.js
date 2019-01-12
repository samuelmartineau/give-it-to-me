// @flow
import React from 'react';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import { getWinesFiltered } from '~/client/store/';
import { MessageManager } from '../MessageManager/MessageManager';

type Props = {
  hasNoResult: boolean
};

const EmptyResults = ({ hasNoResult }: Props) => {
  if (hasNoResult) {
    return (
      <MessageManager
        icon={<SearchIcon />}
        title="Aucun vin trouvé"
        message="Impossible de trouver un vin. Peut être que tu as mis trop de filtres?"
      />
    );
  }
  return null;
};

export default connect(state => ({
  hasNoResult: getWinesFiltered(state).length === 0
}))(EmptyResults);
