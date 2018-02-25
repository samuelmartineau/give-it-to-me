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
import Cells from '../../../Cellar/Cells/Cells';

const styles = () => ({});

type BoxesSelectorProps = {};

class BoxesSelector extends React.Component<BoxesSelectorProps> {
  render() {
    return (
      <CellarContainer>
        <CellarBoxes>
          {boxId => {
            return <SwitchBox boxId={boxId} />;
          }}
        </CellarBoxes>
        <CellarBottles />
        <Cells>
          {(boxId, cellId) => {
            return (
              <SelectedCell
                key={getCellId(boxId, cellId)}
                boxId={boxId}
                cellId={cellId}
              />
            );
          }}
        </Cells>
      </CellarContainer>
    );
  }
}

export default compose(withStyles(styles))(BoxesSelector);
