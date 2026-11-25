import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from '@tanstack/react-router';
import CellarContainer from '@/components/Cellar/CellarContainer';
import CellarBoxes from '@/components/Cellar/CellarBoxes';
import WineModalButton from '@/components/Wine/WineModal/WineModalButton';
import AddToFavoriteButton from '@/components/Favorite/AddToFavoriteButton';
import { Button } from '@/components/Toolkit';
import OpenInNewIcon from '@mui/icons-material/OpenInNewRounded';
import { CellarBoxConnected } from './CellarBox';
import CellarBottles from './CellarBottles';
import WineDetails from './WineDetails';
import { WineEnhanced } from '@/Cellar.type';

const WineActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 10px;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;

  & > button,
  & > a > button {
    width: 100%;
    flex-direction: column;
    gap: 0;
    min-height: 60px;
    padding: 4px;
    font-size: 0.85rem;
  }
`;

type Props = {
  wine: WineEnhanced;
};

export const WineContentCard: FC<Props> = ({ wine }) => {
  return (
    <>
      {!!wine.isInBoxes && (
        <CellarContainer compact>
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
        <AddToFavoriteButton wineId={wine.id} />
        <WineModalButton wineId={wine.id} />
        <Link
          to="/wine/$id"
          target="_blank"
          params={{ id: wine.id.toString() }}
        >
          <Button type="button" tabIndex={-1}>
            <OpenInNewIcon />
            Fiche
          </Button>
        </Link>
      </WineActions>
    </>
  );
};
