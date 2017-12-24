import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import CellarSchema from '../Cellar/CellarSchema';
import { getAvailableBoxes } from '../Cellar/utils';
import BoxSchema from '../Cellar/BoxSchema';

const styles = () => ({
  boxes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gridGap: '10px'
  },
  box: {}
});

class CellsSelector extends React.Component {
  onBoxSelect = boxId => {
    this.setState(state => ({
      selection: {
        ...state.selection,
        [boxId]: [0]
      }
    }));
  };
  render() {
    const { bottles, classes, boxes, cells } = this.props;
    const selectedBottles = Object.keys(boxes).reduce((acc, boxId) => {
      return acc.concat(
        cells[boxId].map(cellId => ({
          box: boxId,
          cell: cellId,
          color: 'blue'
        }))
      );
    }, []);
    // console.log("selectedBottles", selectedBottles);
    const realBottlesAndSelected = bottles.concat(selectedBottles);
    const availableBoxes = getAvailableBoxes(bottles);
    return (
      <div>
        <CellarSchema
          bottles={realBottlesAndSelected}
          onSelect={this.onBoxSelect}
          selectableBoxes={availableBoxes}
        />
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(state => ({
    bottles: state.cellar.boxes,
    boxes: state.adding.boxes,
    cells: state.adding.cells
  }))
)(CellsSelector);
