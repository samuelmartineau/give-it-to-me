import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { getWinesFiltered, RootState } from '@/store/';
import { MessageManager } from '../MessageManager/MessageManager';

type Props = PropsFromRedux;

const EmptyResults: FC<Props> = ({ hasNoResult }) => {
  if (!hasNoResult) return null;

  return (
    <MessageManager
      icon={<SearchIcon />}
      title="Aucun vin trouvé"
      message="Rien ne correspond. Essaie d’enlever un filtre ou de chercher un autre nom."
    />
  );
};

const connector = connect((state: RootState) => ({
  hasNoResult: getWinesFiltered(state).length === 0,
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(EmptyResults);
