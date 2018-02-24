// @flow
import React from 'react';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import CellarContainer from '../../../Cellar/CellarContainer';
import CellarBoxes from '../../../Cellar/CellarBoxes';
import CellarBottlesConnected from '../../../Cellar/CellarBottlesConnected';
import CellarBoxSelectableConnected from './CellarBoxSelectableConnected';
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
            return <CellarBoxSelectableConnected boxId={boxId} />;
          }}
        </CellarBoxes>
        <CellarBottlesConnected />
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
