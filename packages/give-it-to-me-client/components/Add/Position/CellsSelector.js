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
  onSelect,
  onUnselect,
  selectedCellsInBox,
  bottlesInBox,
  cellsIds,
  classes
}: CellsSelectorProps) => {
  console.log('CellsSelector render', boxId);
  const selectedCells = selectedCellsInBox
    ? Object.keys(selectedCellsInBox)
    : [];
  if (!selectedCells.length) {
    return null;
  }
  const bottles = bottlesInBox
    ? Object.keys(bottlesInBox).map(cellId => bottlesInBox[cellId])
    : [];
  const selectedCellsStyled = selectedCells.map(cellId => ({
    cell: cellId,
    box: boxId,
    color: 'blue'
  }));

  const realBottlesAndSelected = bottles.concat(selectedCellsStyled);
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
