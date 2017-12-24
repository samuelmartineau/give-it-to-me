// @flow
import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  spinner: {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    margin: '3em 0'
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`
  }
});

type SpinnerProps = {
  classes: {}
};

const Spinner = ({ classes }: SpinnerProps) => (
  <div className={classes.spinner}>
    <CircularProgress className={classes.progress} size={50} />
  </div>
);

export default withStyles(styles)(Spinner);
