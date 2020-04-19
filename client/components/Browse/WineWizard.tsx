import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { WineCard } from '~/client/components/Wine/WineCard';
import { WineContentCard } from '~/client/components/Wine/WineContentCard';
import { getBrowsedWine, RootState } from '~/client/store';

type Props = PropsFromRedux;

const CellWizard: FC<Props> = ({ wine }) => {
  if (!wine) return null;
  return (
    <WineCard wine={wine}>{(wine) => <WineContentCard wine={wine} />}</WineCard>
  );
};

const connector = connect((state: RootState) => ({
  wine: getBrowsedWine(state),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CellWizard);
