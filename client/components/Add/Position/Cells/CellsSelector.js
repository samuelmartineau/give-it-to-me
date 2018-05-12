// @flow
import React from 'react';
import BoxContainer from '../../../Cellar/Box/BoxContainer';
import BoxBottles from '../../../Cellar/Box/BoxBottles';
import BoxCells from '../../../Cellar/Cells/BoxCells';
import SwitchCell from './SwitchCell';
import SelectedCell from './SelectedCell';
import { getCellId } from '../../../Cellar/utils';

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
          {cellId => <SwitchCell key={cellId} boxId={boxId} cellId={cellId} />}
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
