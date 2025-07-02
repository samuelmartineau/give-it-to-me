import React, { FC } from 'react';
import BoxCells from '@/components/Cellar/Cells/BoxCells';
import { getCellId } from '@/components/Cellar/utils';
import CellWizard from './CellWizard';

type Props = {
  boxId: number;
  selectedCell: { boxId: number; cellId: number };
};

export const BoxCellsWizard: FC<Props> = ({ boxId, selectedCell }) => {
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
