// @flow
import React from 'react';
import CellarContainer from '../../../Cellar/CellarContainer';
import CellarBoxes from '../../../Cellar/CellarBoxes';
import CellarBottles from '../../../Cellar/CellarBottles';
import ClickHandlerBox from './ClickHandlerBox';
import { getCellId } from '../../../Cellar/utils';
import SelectedCell from './SelectedCell';
import CellarCells from '../../../Cellar/Cells/CellarCells';

type BoxesSelectorProps = {};

class BoxesSelector extends React.Component<BoxesSelectorProps> {
  render() {
    return (
      <CellarContainer>
        <CellarBoxes>
          {boxId => <ClickHandlerBox key={boxId} boxId={boxId} />}
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
