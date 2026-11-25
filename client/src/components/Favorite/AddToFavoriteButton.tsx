import React, { FC } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from '@/components/Toolkit';
import { addToFavorite, removeFromFavorite, RootState } from '@/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

type RawProps = { wineId: number };

type Props = PropsFromRedux & RawProps;

const StyledButton = styled(Button)<{ $isFavorite: boolean }>`
  background: ${({ $isFavorite, theme }) =>
    $isFavorite ? theme.colors.primary : theme.colors.surface};
  color: ${({ $isFavorite, theme }) =>
    $isFavorite ? theme.colors.onPrimary : theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background: ${({ $isFavorite, theme }) =>
      $isFavorite ? theme.colors.primaryDark : theme.colors.primaryVarient};
  }
`;

const AddToFavoriteButton: FC<Props> = ({
  addToFavorite,
  removeFromFavorite,
  isFavorite,
}) => {
  const action = isFavorite ? removeFromFavorite : addToFavorite;
  return (
    <StyledButton
      type="button"
      onClick={action}
      $isFavorite={isFavorite}
      aria-pressed={isFavorite}
    >
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      Favori
    </StyledButton>
  );
};

const connector = connect(
  (state: RootState, { wineId }: RawProps) => ({
    isFavorite: state.favorites.all.includes(wineId),
  }),
  (dispatch: ThunkDispatch<{}, {}, AnyAction>, { wineId }: RawProps) => ({
    addToFavorite() {
      dispatch(addToFavorite(wineId));
    },
    removeFromFavorite() {
      dispatch(removeFromFavorite(wineId));
    },
  }),
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddToFavoriteButton);
