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
`};
`;

const CellSelectorStyled = styled(CellSelector)`
  ${(props) => props.theme.media.screen`
  width: 50%;
`};
`;

const WineWizardStyled = styled(WineWizard)`
  ${(props) => props.theme.media.handheld`
  align-self: center;
`};
`;

export const Browse = () => {
  return (
    <Container>
      <BoxesSelector />
      <Actions>
        <CellSelectorStyled />
        <WineWizardStyled />
      </Actions>
    </Container>
  );
};
