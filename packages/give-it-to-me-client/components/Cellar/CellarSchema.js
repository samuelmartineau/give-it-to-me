// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import ReactFauxDOM from 'react-faux-dom';

import { makeCellarUtils } from './utils';
const svgContainer = ReactFauxDOM.createElement('svg');
const {
  drawCellar,
  drawBottlesInCellar,
  addEventOnBox,
  clearBottles
} = makeCellarUtils(svgContainer);

drawCellar();

const styles = () => ({
  boxClickable: {
    cursor: 'pointer',
    '&:hover': {
      fill: '#7098d6'
    }
  }
});

type Props = {
  bottles: Array,
  onSelect: Function,
  classes: { boxClickable: String },
  selectableBoxes: Array<number>
};

const CellarSchema = ({
  bottles = [],
  onSelect,
  classes,
  selectableBoxes = []
}: Props) => {
  clearBottles();
  drawBottlesInCellar(bottles);

  if (onSelect) {
    addEventOnBox(selectableBoxes, onSelect, classes);
  }

  return <div>{svgContainer.toReact()}</div>;
};

export default withStyles(styles)(CellarSchema);
