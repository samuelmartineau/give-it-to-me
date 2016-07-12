import React, {PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentClose from 'material-ui/svg-icons/navigation/close'

import BoxSchema from './BoxSchema'
import * as cellSelectorStyle from '../styles/cellSelector'
import {WINE_TYPES} from '../constants/WineTypes'
import {SELECTED_COLOR} from '../constants/Cellar'

const CellsSelector = ({onUnselectBox, onSelectBox, selectedCells, isCellDisabled, isCellClickable, selectableBoxes, selectableCells, boxId, bottlesByBoxes, onSelectCell}) => {
  const bottles = bottlesByBoxes[boxId] || []
  const cellsSelected = selectedCells[boxId] || []
  const bottlesToDraw = bottles.map((bottle) => ({
    color: WINE_TYPES[bottle.wineType].color,
    box: boxId,
    cell: bottle.cell,
    isBoxSchema: true
  })).concat(cellsSelected.map((cell) => ({
    color: SELECTED_COLOR,
    box: boxId,
    cell: cell,
    isBoxSchema: true
  })))

  return (
    <Paper zDepth={1} style={cellSelectorStyle.cellSelector}>
      <SelectField value={boxId} onChange={onSelectBox}>
        {selectableBoxes.map((id, index) => (
          <MenuItem
            key={index}
            value={id}
            primaryText={id}
          />
        ))}
      </SelectField>
      {Object.keys(selectedCells).length > 1
        ? (
        <FloatingActionButton
          style={cellSelectorStyle.cellSelectorCloseButton}
          mini
          secondary
          onTouchTap={onUnselectBox}
        >
          <ContentClose />
        </FloatingActionButton>
        )
        : null
      }
      <BoxSchema
        boxId={boxId}
        bottlesToDraw={bottlesToDraw}
        selectableCells={selectableCells}
        onSelectCell={onSelectCell}
        isCellClickable={isCellClickable}
        isCellDisabled={isCellDisabled}
         />
    </Paper>
  )
}

CellsSelector.propTypes = {
  boxId: PropTypes.number.isRequired,
  selectedCells: PropTypes.object.isRequired,
  bottlesByBoxes: PropTypes.object.isRequired,
  selectableCells: PropTypes.object.isRequired,
  selectableBoxes: PropTypes.object.isRequired,
  onSelectCell: PropTypes.func.isRequired,
  onSelectBox: PropTypes.func.isRequired,
  onUnselectBox: PropTypes.func.isRequired,
  isCellClickable: PropTypes.func.isRequired
}

export default CellsSelector
