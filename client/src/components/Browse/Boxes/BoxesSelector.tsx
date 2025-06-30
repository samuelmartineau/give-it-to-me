import React from 'react';
import CellarContainer from '~/client/components/Cellar/CellarContainer';
import CellarBoxes from '~/client/components/Cellar/CellarBoxes';
import CellarBottles from '~/client/components/Cellar/CellarBottles';
import CellarCells from '~/client/components/Cellar/Cells/CellarCells';
import { getCellId } from '~/client/components/Cellar/utils';
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
