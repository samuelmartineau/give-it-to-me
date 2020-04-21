import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { isBoxSelected, unselectBox, RootState } from '~/client/store';
import styled from 'styled-components';
import BoxContainer from '~/client/components/Cellar/Box/BoxContainer';
import BoxBottles from '~/client/components/Cellar/Box/BoxBottles';
import BoxCells from '~/client/components/Cellar/Cells/BoxCells';
import { getCellId } from '~/client/components/Cellar/utils';
import ClickHandlerCell from './ClickHandlerCell';
import SelectedCell from './SelectedCell';

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

type RawProps = {
  boxId: number;
};

type Props = RawProps & PropsFromRedux;

const CellsSelector: FC<Props> = ({ boxId, isBoxSelected, onUnselect }) => {
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
          {(cellId) => (
            <ClickHandlerCell key={cellId} boxId={boxId} cellId={cellId} />
          )}
        </BoxCells>
        <BoxBottles boxId={boxId} />
        <g>
          <BoxCells boxId={boxId}>
            {(cellId) => (
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

const connector = connect(
  (state: RootState, { boxId }: RawProps) => ({
    isBoxSelected: isBoxSelected(state, boxId),
  }),
  (dispatch, { boxId }: RawProps) => ({
    onUnselect: () => dispatch(unselectBox(boxId)),
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CellsSelector);
