// @flow
import React from 'react';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import CellarContainer from '../../../Cellar/CellarContainer';
import CellarBoxes from '../../../Cellar/CellarBoxes';
import CellarBottles from '../../../Cellar/CellarBottles';
import SwitchBox from './SwitchBox';
import { getCellId } from '../../../Cellar/utils';
import SelectedCell from './SelectedCell';
import CellarCells from '../../../Cellar/Cells/CellarCells';

const styles = () => ({});

type BoxesSelectorProps = {};

class BoxesSelector extends React.Component<BoxesSelectorProps> {
  render() {
    return (
      <CellarContainer>
        <CellarBoxes>
          {boxId => {
            return <SwitchBox key={boxId} boxId={boxId} />;
          }}
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

export default compose(withStyles(styles))(BoxesSelector);