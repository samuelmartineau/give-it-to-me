import React from 'react';
import { withStyles } from 'material-ui/styles';
import CellarSchema from '../Cellar/CellarSchema';
import { getAvailableBoxes } from '../Cellar/utils';
import BoxSchema from '../Cellar/BoxSchema';

const styles = () => ({
  boxes: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  box: {
    minWidth: '200px',
    flex: 1,
    margin: '1em'
  }
});

class CellsSelector extends React.Component {
  state = {
    checked: false,
    selection: {
      12: [0]
    }
  };

  onBoxSelect = boxId => {
    this.setState(state => ({
      selection: {
        ...state.selection,
        [boxId]: [0]
      }
    }));
  };
  render() {
    const { bottles, classes } = this.props;
    const { selection } = this.state;
    const boxesSelected = Object.keys(selection);
    const selectedBottles = boxesSelected.reduce((acc, boxId) => {
      return acc.concat(
        selection[boxId].map(cellId => ({
          box: boxId,
          cell: cellId,
          color: 'blue'
        }))
      );
    }, []);
    // console.log("selectedBottles", selectedBottles);
    const realBottlesAndSelected = bottles.concat(selectedBottles);
    const availableBoxes = getAvailableBoxes(bottles);
    // console.log("availableBoxes", availableBoxes);
    return (
      <div>
        <CellarSchema
          bottles={realBottlesAndSelected}
          onSelect={this.onBoxSelect}
          selectableBoxes={availableBoxes}
        />
        <div className={classes.boxes}>
          {boxesSelected.map(boxeId => (
            <BoxSchema
              className={classes.box}
              key={boxeId}
              boxId={boxeId}
              bottles={[
                {
                  id: 1,
                  box: 23,
                  cell: 6
                }
              ]}
              onSelect={console.log}
              selectableCells={[0, 1, 2, 3]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CellsSelector);
