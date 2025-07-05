import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { getBottlesInBox, unselectBox, RootState } from '@/store';
import styled from 'styled-components';
import BoxContainer from '@/components/Cellar/Box/BoxContainer';
import { BoxCellsWizard } from './BoxCellsWizard';
import BoxCells from '@/components/Cellar/Cells/BoxCells';
import ClickHandlerCell from './ClickHandlerCell';
import BoxCell from '@/components/Cellar/Box/BoxCell';
import {
  SelectableCell,
  UnSelectableCell,
} from '@/components/Wine/WineModal/InBoxes/ClickHandlerCell';

const Wrapper = styled.div``;

type RawProps = {
  boxId?: number;
  className?: string;
};

type Props = RawProps & PropsFromRedux;

const CellSelector: FC<Props> = ({ boxId, cellId, bottles, className }) => {
  if (!boxId) return null;
  return (
    <Wrapper className={className}>
      <BoxContainer boxId={boxId}>
        <BoxCells boxId={boxId}>
          {(boxCellId) => {
            const bottle = bottles.find(
              (bottle) => bottle.cell === boxCellId && bottle.box === boxId,
            );
            if (!bottle) {
              return <BoxCell cellId={boxCellId} />;
            }
            if (cellId === boxCellId) {
              return (
                <UnSelectableCell
                  bottleId={bottle.id}
                  boxId={boxId}
                  cellId={boxCellId}
                />
              );
            }
            return (
              <SelectableCell
                bottleId={bottle.id}
                boxId={boxId}
                cellId={boxCellId}
              />
            );
          }}
        </BoxCells>
        <BoxCellsWizard
          boxId={boxId}
          selectedCell={{
            boxId,
            cellId,
          }}
        />
      </BoxContainer>
    </Wrapper>
  );
};

const connector = connect(
  (state: RootState) => ({
    boxId: state.browse.boxId,
    cellId: state.browse.cellId,
    bottles: state.browse.boxId
      ? getBottlesInBox(state, state.browse.boxId)
      : [],
  }),
  (dispatch, { boxId }: RawProps) => ({
    onUnselect: () => {
      if (boxId) {
        dispatch(unselectBox(boxId));
      }
    },
  }),
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CellSelector);
