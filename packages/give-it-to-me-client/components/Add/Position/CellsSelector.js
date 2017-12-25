// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import BoxSchemaConnected from '../../Cellar/BoxSchemaConnected';

type CellsSelectorProps = {
  selectedBoxes: Array<number>,
  classes: {
    boxes: any,
    box: any
  }
};

const styles = () => ({
  boxes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gridGap: '10px'
  },
  box: {}
});

const CellsSelector = ({ selectedBoxes = [], classes }: CellsSelectorProps) => (
  <div className={classes.boxes}>
    {selectedBoxes.map(boxeId => (
      <BoxSchemaConnected
        className={classes.box}
        key={boxeId}
        boxId={boxeId}
        selectableCells={[]}
        onSelect={console.log}
      />
    ))}
  </div>
);

export default withStyles(styles)(CellsSelector);
