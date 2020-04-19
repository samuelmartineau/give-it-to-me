import React from 'react';
import BoxCells from '~/client/components/Cellar/Cells/BoxCells';
import { getCellId } from '~/client/components/Cellar/utils';
import CellWizard from './CellWizard';

type Props = {
  boxId: number;
  selectedCell: Array<number>;
};

export const BoxCellsWizard = ({ boxId, selectedCell }: Props) => {
  return (
    <g>
      <BoxCells boxId={boxId}>
        {(cellId) => (
          <CellWizard
            key={getCellId(boxId, cellId)}
            boxId={boxId}
            cellId={cellId}
            selectedCell={selectedCell}
          />
        )}
      </BoxCells>
    </g>
  );
};
