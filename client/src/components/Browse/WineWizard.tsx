import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { WineCard } from '@/components/Wine/WineCard';
import { WineContentCard } from '@/components/Wine/WineContentCard';
import { getBrowsedWine, RootState } from '@/store';

type Props = PropsFromRedux & { className?: string };

const CellWizard: FC<Props> = ({ wine, className }) => {
  if (!wine) return null;
  return (
    <WineCard className={className} wine={wine}>
      {(wine) => <WineContentCard wine={wine} />}
    </WineCard>
  );
};

const connector = connect((state: RootState) => ({
  wine: getBrowsedWine(state),
}));

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CellWizard);
