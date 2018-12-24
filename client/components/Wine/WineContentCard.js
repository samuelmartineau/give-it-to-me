// @flow

import React from 'react';
import styled from 'styled-components';
import CellarContainer from '~/client/components/Cellar/CellarContainer';
import CellarBoxes from '~/client/components/Cellar/CellarBoxes';
import WineModalButton from '~/client/components/Wine/WineModal/WineModalButton';
import AddToFavoriteButton from '~/client/components/Favorite/AddToFavoriteButton';
import { CellarBoxConnected } from './CellarBox';
import CellarBottles from './CellarBottles';
import WineDetails from './WineDetails';
import type { WineType } from './Wine.type';

const WineActions = styled.div`
  display: flex;
  justify-content: space-evenly;
}
`;

type Props = {
  wine: WineType
};

export class WineContentCard extends React.Component<Props> {
  render() {
    const { wine } = this.props;
    return (
      <React.Fragment>
        <CellarContainer>
          <CellarBoxes>
            {boxId => (
              <CellarBoxConnected boxId={boxId} wineId={wine.id} key={boxId} />
            )}
          </CellarBoxes>
          <CellarBottles wineId={wine.id} />
        </CellarContainer>
        <WineDetails wine={wine} />
        <WineActions>
          <WineModalButton wineId={wine.id} />
          <AddToFavoriteButton wineId={wine.id} />
        </WineActions>
      </React.Fragment>
    );
  }
}
