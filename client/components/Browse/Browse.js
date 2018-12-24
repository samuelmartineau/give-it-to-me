// @flow
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
  display: flex;
`;

const CellSelectorStyled = styled(CellSelector)`
  width: 50%;
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
