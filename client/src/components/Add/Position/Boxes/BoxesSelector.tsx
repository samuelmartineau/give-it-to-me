import React from 'react';
import CellarContainer from '@/components/Cellar/CellarContainer';
import CellarBoxes from '@/components/Cellar/CellarBoxes';
import CellarBottles from '@/components/Cellar/CellarBottles';
import { getCellId } from '@/components/Cellar/utils';
import CellarCells from '@/components/Cellar/Cells/CellarCells';
import ClickHandlerBox from './ClickHandlerBox';
import SelectedCell from './SelectedCell';

type BoxesSelectorProps = {};

class BoxesSelector extends React.Component<BoxesSelectorProps> {
  render() {
    return (
      <CellarContainer>
        <CellarBoxes>
          {(boxId) => <ClickHandlerBox key={boxId} boxId={boxId} />}
        </CellarBoxes>
        <CellarBottles />
        <CellarCells>
          {(boxId, cellId) => (
            <SelectedCell
              key={getCellId(boxId, cellId)}
              boxId={boxId}
              cellId={cellId}
            />
          )}
        </CellarCells>
      </CellarContainer>
    );
  }
}

export default BoxesSelector;
