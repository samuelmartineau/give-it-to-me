// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import BoxSchema from '../../Cellar/Box/BoxSchema';
import { getAvailableCells } from '../../Cellar/utils';

type CellsSelectorProps = {
  boxId: number,
  onUnselect: Function,
  bottles: Array<any>,
  selectedCells: Array<any>,
  classes: {
    box: any,
    onSelect: Function
  }
};

const styles = () => ({
  box: {}
});

const CellsSelector = ({
  boxId,
  bottles,
  onSelect,
  onUnselect,
  selectedCells,
  classes
}: CellsSelectorProps) => {
  console.log('test', selectedCells, bottles);
  const selectedCellsStyled = selectedCells.map(cellId => ({
    cell: cellId,
    box: boxId,
    color: 'blue'
  }));
  const realBottlesAndSelected = bottles.concat(selectedCellsStyled);
  const availableBoxes = getAvailableCells(boxId, bottles);
  return (
    <div className={classes.box}>
      <button onClick={onUnselect}>close</button>
      <BoxSchema
        className={classes.box}
        boxId={boxId}
        bottles={realBottlesAndSelected}
        selectableCells={[]}
        onSelect={onSelect}
      />
    </div>
  );
};

export default withStyles(styles)(CellsSelector);
