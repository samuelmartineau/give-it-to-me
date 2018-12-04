import React from 'react';
import CellarContainer from '../Cellar/CellarContainer';
import CellarBoxes from '../Cellar/CellarBoxes';
import WineDetails from './WineDetails';
import WineModalButton from '~/client/components/Wine/WineModal/WineModalButton';
import { CellarBoxConnected } from './CellarBox';
import CellarBottles from './CellarBottles';
import AddToFavoriteButton from '~/client/components/Favorite/AddToFavoriteButton';

export class WineContentCard extends React.Component<> {
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
        <WineModalButton wineId={wine.id} />
        <AddToFavoriteButton wineId={wine.id} />
      </React.Fragment>
    );
  }
}
