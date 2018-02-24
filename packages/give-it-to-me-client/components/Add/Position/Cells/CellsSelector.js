// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import BoxContainer from '../../../Cellar/Box/BoxContainer';
import BoxCell from '../../../Cellar/Box/BoxCell';
import { getAvailableCells } from '../../../Cellar/utils';

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
  isBoxSelected,
  onUnselect,
  classes
}: CellsSelectorProps) => {
  console.log('CellsSelector render', boxId);
  // const selectedCells = selectedCellsInBox || [];
  // if (!selectedCells.length) {
  //   return null;
  // }
  // const bottles = bottlesInBox
  //   ? Object.keys(bottlesInBox).map(cellId => bottlesInBox[cellId])
  //   : [];
  // const selectedCellsStyled = selectedCells.map(cellId => ({
  //   cell: cellId,
  //   box: boxId,
  //   color: 'blue'
  // }));

  //  const realBottlesAndSelected = bottles.concat(selectedCellsStyled);

  console.log(isBoxSelected, boxId);
  return isBoxSelected ? (
    <div className={classes.box}>
      <button onClick={onUnselect}>close</button>
      <BoxContainer boxId={boxId}>
        {cellId => <BoxCell key={cellId} boxId={boxId} cellId={cellId} />}
      </BoxContainer>
    </div>
  ) : null;
};

export default withStyles(styles)(CellsSelector);
