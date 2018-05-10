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

const styles = theme => ({
  cellSelectors: {
    display: 'grid',
    gridGap: '10px',
    [theme.breakpoints.only('xs')]: {
      gridTemplateColumns: 'repeat(1, auto)'
    },
    [theme.breakpoints.only('sm')]: {
      gridTemplateColumns: 'repeat(2, auto)'
    },
    [theme.breakpoints.only('md')]: {
      gridTemplateColumns: 'repeat(4, auto)'
    },
    [theme.breakpoints.only('lg')]: {
      gridTemplateColumns: 'repeat(3, auto)'
    },
    [theme.breakpoints.only('xl')]: {
      gridTemplateColumns: 'repeat(5, auto)'
    }
  }
});

const CellsSelectors = ({ classes }: CellsSelectorsProps) => {
  return (
    <div className={classes.cellSelectors}>
      {boxes.map(boxId => <BoxFilter key={boxId} boxId={boxId} />)}
    </div>
  );
};

export default withStyles(styles)(CellsSelectors);
