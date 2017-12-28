// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import CellsSelectorConnected from './CellsSelectorConnected';

type CellsSelectorsProps = {
  selectedBoxes: Array<number>,
  classes: {
    cellSelectors: any
  }
};

const styles = () => ({
  cellSelectors: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gridGap: '10px'
  }
});

const CellsSelectors = ({
  selectedBoxes = [],
  classes
}: CellsSelectorsProps) => {
  return (
    <div className={classes.cellSelectors}>
      {selectedBoxes.map(boxId => (
        <CellsSelectorConnected key={boxId} boxId={boxId} />
      ))}
    </div>
  );
};

export default withStyles(styles)(CellsSelectors);
