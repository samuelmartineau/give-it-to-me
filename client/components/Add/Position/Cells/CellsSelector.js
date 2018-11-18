// @flow
import React from 'react';
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

const CellsSelector = ({
  boxId,
  isBoxSelected,
  onUnselect
}: CellsSelectorProps) => {
  if (!isBoxSelected) {
    return null;
  }
  return (
    <div>
      <button onClick={onUnselect}>close</button>
      <BoxContainer boxId={boxId}>
        <BoxCells boxId={boxId}>
          {cellId => (
            <ClickHandlerCell key={cellId} boxId={boxId} cellId={cellId} />
          )}
        </BoxCells>
        <BoxBottles boxId={boxId} />
        <BoxCells boxId={boxId}>
          {cellId => (
            <SelectedCell
              key={getCellId(boxId, cellId)}
              boxId={boxId}
              cellId={cellId}
            />
          )}
        </BoxCells>
      </BoxContainer>
    </div>
  );
};

export default CellsSelector;
