import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import CellarSchema from '../../Cellar/CellarSchema';
import { getAvailableBoxes } from '../../Cellar/utils';
import { getSelectedCells } from '../../../store';

const styles = () => ({});

class BoxesSelector extends React.Component {
  onBoxSelect = boxId => {
    this.setState(state => ({
      selection: {
        ...state.selection,
        [boxId]: [0]
      }
    }));
  };
  render() {
    const { selectedBottles, bottles } = this.props;
    const selectedBottlesStyled = selectedBottles.map(bottle => ({
      ...bottle,
      color: 'blue'
    }));

    const realBottlesAndSelected = bottles.concat(selectedBottlesStyled);
    const availableBoxes = getAvailableBoxes(bottles);
    return (
      <div>
        <CellarSchema
          bottles={realBottlesAndSelected}
          onSelect={console.log}
          selectableBoxes={availableBoxes}
        />
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(state => ({
    selectedBottles: getSelectedCells(state),
    bottles: state.bottles.all
  }))
)(BoxesSelector);
