// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import BoxFilter from './BoxFilter';
import { boxes } from '../../../Cellar/utils';

type CellsSelectorsProps = {
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

const CellsSelectors = ({ classes }: CellsSelectorsProps) => {
  console.log('CellsSelectors');
  return (
    <div className={classes.cellSelectors}>
      {boxes.map(boxId => <BoxFilter key={boxId} boxId={boxId} />)}
    </div>
  );
};

export default withStyles(styles)(CellsSelectors);
