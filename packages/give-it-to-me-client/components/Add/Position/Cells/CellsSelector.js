// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import BoxContainer from '../../../Cellar/Box/BoxContainer';
import BoxBottles from '../../../Cellar/Box/BoxBottles';
import BoxCells from '../../../Cellar/Cells/BoxCells';
import SwitchCell from './SwitchCell';
import SelectedCell from './SelectedCell';
import { getCellId } from '../../../Cellar/utils';
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

  if (!isBoxSelected) {
    return null;
  }
  return (
    <div className={classes.box}>
      <button onClick={onUnselect}>close</button>
      <BoxContainer boxId={boxId}>
        <BoxCells boxId={boxId}>
          {cellId => <SwitchCell key={cellId} boxId={boxId} cellId={cellId} />}
        </BoxCells>
        <BoxBottles boxId={boxId} />
        <BoxCells boxId={boxId}>
          {cellId => (
            <SelectedCell
              key={getCellId(boxId, cellId)}
              boxId={boxId}
              cellId={cellId}
            />
          )}
        </BoxCells>
      </BoxContainer>
    </div>
  );
};

export default withStyles(styles)(CellsSelector);
