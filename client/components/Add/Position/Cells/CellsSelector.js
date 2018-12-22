// @flow
import React from 'react';
import styled from 'styled-components';
import BoxContainer from '~/client/components/Cellar/Box/BoxContainer';
import BoxBottles from '~/client/components/Cellar/Box/BoxBottles';
import BoxCells from '~/client/components/Cellar/Cells/BoxCells';
import { getCellId } from '~/client/components/Cellar/utils';
import ClickHandlerCell from './ClickHandlerCell';
import SelectedCell from './SelectedCell';

type CellsSelectorProps = {
  boxId: number,
  onUnselect: Function,
  bottles: Array<any>,
  selectedCells: Array<any>,
  classes: {
    box: any,
    onSelect: Function
  },
  isBoxSelected: boolean
};
const Wrapper = styled.div``;
const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BoxLabel = styled.div`
  display: inline-block;
`;
const RemoveButton = styled.button`
  background-color: inherit;
  border: 0;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #dedede;
  }

  &:after {
    clear: both;
  }
`;

const CellsSelector = ({
  boxId,
  isBoxSelected,
  onUnselect
}: CellsSelectorProps) => {
  if (!isBoxSelected) {
    return null;
  }
  return (
    <Wrapper>
      <Actions>
        <BoxLabel>Casier {boxId}</BoxLabel>
        <RemoveButton onClick={onUnselect}>retirer</RemoveButton>
      </Actions>
      <BoxContainer boxId={boxId}>
        <BoxCells boxId={boxId}>
          {cellId => (
            <ClickHandlerCell key={cellId} boxId={boxId} cellId={cellId} />
          )}
        </BoxCells>
        <BoxBottles boxId={boxId} />
        <g>
          <BoxCells boxId={boxId}>
            {cellId => (
              <SelectedCell
                key={getCellId(boxId, cellId)}
                boxId={boxId}
                cellId={cellId}
              />
            )}
          </BoxCells>
        </g>
      </BoxContainer>
    </Wrapper>
  );
};

export default CellsSelector;
