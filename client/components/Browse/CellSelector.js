// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getBottlesInBox, unselectBox } from '~/client/store';
import styled from 'styled-components';
import BoxContainer from '~/client/components/Cellar/Box/BoxContainer';
import BoxBottles from './BoxBottles';
import BoxCells from '~/client/components/Cellar/Cells/BoxCells';
import ClickHandlerCell from './ClickHandlerCell';

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

const CellSelector = ({ boxId, cellId, bottles }: CellsSelectorProps) => {
  return (
    boxId && (
      <Wrapper>
        <BoxContainer boxId={boxId}>
          <BoxCells boxId={boxId}>
            {boxCellId => {
              const bottle = bottles.find(
                bottle => bottle.cell === boxCellId && bottle.box === boxId
              );
              return (
                <ClickHandlerCell
                  key={boxCellId}
                  isCellSelected={cellId === boxCellId}
                  isCellSelectable={!!bottle}
                  boxId={boxId}
                  cellId={boxCellId}
                />
              );
            }}
          </BoxCells>
          <BoxBottles
            boxId={boxId}
            selectableBottleIds={bottles.map(bottle => bottle.id)}
            selectedCell={{
              boxId,
              cellId
            }}
          />
        </BoxContainer>
      </Wrapper>
    )
  );
};

export default connect(
  state => ({
    boxId: state.browse.boxId,
    cellId: state.browse.cellId,
    bottles: state.browse.boxId
      ? getBottlesInBox(state, state.browse.boxId)
      : []
  }),
  (dispatch, { boxId }) => ({
    onUnselect: () => dispatch(unselectBox(boxId))
  })
)(CellSelector);
