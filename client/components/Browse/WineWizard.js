// @flow
import React from 'react';
import { connect } from 'react-redux';
import { WineCard } from '~/client/components/Wine/WineCard';
import { WineContentCard } from '~/client/components/Wine/WineContentCard';
import { getBrowsedWine } from '~/client/store';

type Props = {
  wine: number
};

const CellWizard = ({ wine }: Props) => {
  return (
    !!wine && (
      <WineCard wine={wine}>{wine => <WineContentCard wine={wine} />}</WineCard>
    )
  );
};

export default connect(state => ({
  wine: getBrowsedWine(state)
}))(CellWizard);
