// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getWinesFiltered } from '~/client/store/';
import { WineCardConnected } from '../Wine/WineCardConnected';
import { PICTURE_UPLOAD } from '~/config';

type Props = {};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(calc(${PICTURE_UPLOAD.THUMBNAIL.WIDTH + 16}px + 2em), 1fr)
  );
  grid-gap: 30px;
`;
const WineCardConnectedStyled = styled(WineCardConnected)`
  align-self: center;
  justify-self: center;
`;

export const Wines = props => {
  return (
    <Wrapper>
      {props.wines.map(wineId => (
        <WineCardConnectedStyled key={wineId} wineId={wineId}>
          {wine => wine.name}
        </WineCardConnectedStyled>
      ))}
    </Wrapper>
  );
};

export const WinesConnected = connect(state => ({
  wines: getWinesFiltered(state)
}))(Wines);
