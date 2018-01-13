// @flow
import React from 'react';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import CellarContainer from '../../Cellar/CellarContainer';
import CellarBoxes from '../../Cellar/CellarBoxes';
import CellarBottlesConnected from '../../Cellar/CellarBottlesConnected';
import CellarBoxSelectableConnected from './CellarBoxSelectableConnected';
import SelectedCellsConnected from './SelectedCellsConnected';

const styles = () => ({});

type BoxesSelectorProps = {};

class BoxesSelector extends React.Component<BoxesSelectorProps> {
  render() {
    // const { selectedBottles, bottles } = this.props;
    // const selectedBottlesStyled = selectedBottles.map(bottle => ({
    //   ...bottle,
    //   color: 'blue'
    // }));

    // const realBottlesAndSelected = bottles.concat(selectedBottlesStyled);
    // const availableBoxes = getAvailableBoxes(bottles);
    console.log('render BoxesSelector');
    return (
      <CellarContainer>
        <CellarBoxes>
          {boxId => {
            return <CellarBoxSelectableConnected boxId={boxId} />;
          }}
        </CellarBoxes>
        <CellarBottlesConnected />
        <SelectedCellsConnected />
      </CellarContainer>
    );
  }
}

export default compose(withStyles(styles))(BoxesSelector);
