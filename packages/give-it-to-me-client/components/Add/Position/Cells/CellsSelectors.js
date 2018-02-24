// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import CellsSelectorConnected from './CellsSelectorConnected';
import { cellar } from 'give-it-to-me-config';
import { range } from 'ramda';

const { CELLAR_SCHEMA } = cellar;
const boxes = range(0, CELLAR_SCHEMA.length);

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
      {boxes.map(boxId => <CellsSelectorConnected key={boxId} boxId={boxId} />)}
    </div>
  );
};

export default withStyles(styles)(CellsSelectors);
