import React, { FC } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Button } from '~/client/components/Toolkit';
import { addToFavorite, removeFromFavorite, RootState } from '~/client/store';

type RawProps = { wineId: number };

type Props = PropsFromRedux & RawProps;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ isFavorite }) => !isFavorite && 'transparent'};
`;

const AddToFavoriteButton: FC<Props> = ({
  addToFavorite,
  removeFromFavorite,
  isFavorite,
}) => {
  const action = isFavorite ? removeFromFavorite : addToFavorite;
  return (
    <StyledButton onClick={action} isFavorite={isFavorite}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      Favoris
    </StyledButton>
  );
};

const connector = connect(
  (state: RootState, { wineId }: RawProps) => ({
    isFavorite: state.favorites.all.includes(wineId),
  }),
  (dispatch, { wineId }) => ({
    addToFavorite() {
      dispatch(addToFavorite(wineId));
    },
    removeFromFavorite() {
      dispatch(removeFromFavorite(wineId));
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddToFavoriteButton);
