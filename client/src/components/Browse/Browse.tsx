import React from 'react';
import styled from 'styled-components';
import BoxesSelector from './Boxes/BoxesSelector';
import CellSelector from './Cell/CellSelector';
import WineWizard from './WineWizard';

const Container = styled.div`
  max-width: 800px;
  margin: auto;
`;

const Actions = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  ${(props) => props.theme.media.handheld`
  flex-direction: column;
  align-self: center; 
`};
`;

const CellSelectorStyled = styled(CellSelector)`
  ${(props) => props.theme.media.screen`
  width: 50%;
`};
`;

export const Browse = () => {
  return (
    <Container>
      <BoxesSelector />
      <Actions>
        <CellSelectorStyled />
        <WineWizard />
      </Actions>
    </Container>
  );
};
