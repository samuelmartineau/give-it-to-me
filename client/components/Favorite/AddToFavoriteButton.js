// @flow
import React from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Button } from '~/client/components/Toolkit';
import { addToFavorite, removeFromFavorite } from '~/client/store';

type Props = {
  isFavorite: boolean,
  addToFavorite: Function,
  removeFromFavorite: Function
};

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ isFavorite }) => !isFavorite && 'transparent'};
`;

class AddToFavoriteButton extends React.PureComponent<Props> {
  render() {
    const { addToFavorite, removeFromFavorite, isFavorite } = this.props;
    const action = isFavorite ? removeFromFavorite : addToFavorite;
    return (
      <StyledButton onClick={action} isFavorite={isFavorite}>
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        Favoris
      </StyledButton>
    );
  }
}

export default connect(
  (state, { wineId }) => ({ isFavorite: state.favorites.all.includes(wineId) }),
  (dispatch, { wineId }) => ({
    addToFavorite() {
      dispatch(addToFavorite(wineId));
    },
    removeFromFavorite() {
      dispatch(removeFromFavorite(wineId));
    }
  })
)(AddToFavoriteButton);
