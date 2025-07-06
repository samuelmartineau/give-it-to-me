import React, { FC } from 'react';
import styled from 'styled-components';
import CellarContainer from '@/components/Cellar/CellarContainer';
import CellarBoxes from '@/components/Cellar/CellarBoxes';
import WineModalButton from '@/components/Wine/WineModal/WineModalButton';
import AddToFavoriteButton from '@/components/Favorite/AddToFavoriteButton';
import { CellarBoxConnected } from './CellarBox';
import CellarBottles from './CellarBottles';
import WineDetails from './WineDetails';
import { WineEnhanced } from '@/Cellar.type';

const WineActions = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 1em auto;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
}
`;

type Props = {
  wine: WineEnhanced;
};

export const WineContentCard: FC<Props> = ({ wine }) => {
  return (
    <>
      {!!wine.isInBoxes && (
        <CellarContainer>
          <CellarBoxes>
            {(boxId) => (
              <CellarBoxConnected boxId={boxId} wineId={wine.id} key={boxId} />
            )}
          </CellarBoxes>
          <CellarBottles wineId={wine.id} />
        </CellarContainer>
      )}
      <WineDetails wine={wine} />
      <WineActions>
        <WineModalButton wineId={wine.id} />
        <AddToFavoriteButton wineId={wine.id} />
      </WineActions>
    </>
  );
};
