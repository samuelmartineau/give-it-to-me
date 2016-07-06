import React, {Component, PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentClose from 'material-ui/svg-icons/navigation/close'

import {selectBox, unselectBox, unselectCell, selectCell} from '../actions'
import BoxSchema from './BoxSchema'
import * as cellSelectorStyle from '../styles/cellSelector'
import {WINE_TYPES} from '../constants/WineTypes'
import {SELECTED_COLOR} from '../constants/Cellar'

export default class CellsSelector extends Component {

  constructor (props) {
    super(props)
    this.onSelectBox = this.onSelectBox.bind(this)
    this.onUnselectBox = this.onUnselectBox.bind(this)
    this.onSelectCell = this.onSelectCell.bind(this)
  }

  onSelectCell (cellId) {
    const {
      dispatch,
      selectedCells,
      boxId
    } = this.props
    const isCellAlreadySelected = selectedCells[boxId].indexOf(cellId) > -1
    if (isCellAlreadySelected) {
      dispatch(unselectCell(boxId, cellId))
    } else {
      dispatch(selectCell(boxId, cellId))
    }
  }

  onSelectBox (event, index, value) {
    const {dispatch, boxId} = this.props
    dispatch(unselectBox(boxId))
    dispatch(selectBox(value))
  }

  onUnselectBox () {
    const {dispatch, boxId} = this.props
    dispatch(unselectBox(boxId))
  }

  render () {
    const {selectedCells, selectableCells, boxId, bottlesByBoxes, availableCells} = this.props
    const selectableBoxes = Object.keys(selectableCells).filter(boxId => Object.keys(selectedCells).indexOf(boxId) === -1).map(boxId => parseInt(boxId)).concat([boxId]).sort((a, b) => a - b)
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
        <SelectField value={boxId} onChange={this.onSelectBox}>
          {selectableBoxes.map((id, index) => <MenuItem key={index} value={id} primaryText={id} />)}
        </SelectField>
        {Object.keys(selectedCells).length > 1
          ? <FloatingActionButton
              style={cellSelectorStyle.cellSelectorCloseButton}
              mini
              secondary
              onTouchTap={this.onUnselectBox}>
            <ContentClose />
          </FloatingActionButton>
          : null
        }
        <BoxSchema
          selectableCells={availableCells[boxId]}
          onSelectCell={this.onSelectCell}
          bottlesToDraw={bottlesToDraw}
          boxId={boxId}
          isCellClickable={(cellId) => {
            const isCellAvailable = availableCells[boxId].indexOf(cellId) > -1
            const moreThanOneCellSeltected = selectedCells[boxId].length > 1
            const notAlreadySelected = selectedCells[boxId].indexOf(cellId) === -1
            return isCellAvailable && (moreThanOneCellSeltected || notAlreadySelected)
          }}
          isCellDisabled={(cellId) => {
            const isCellUnavailable = availableCells[boxId].indexOf(cellId) === -1
            const onlyOneCellSeleted = selectedCells[boxId].length === 1
            return onlyOneCellSeleted || isCellUnavailable
          }}
           />
      </Paper>
    )
  }
}

CellsSelector.propTypes = {
  boxId: PropTypes.number.isRequired,
  selectedCells: PropTypes.object.isRequired,
  selectableCells: PropTypes.object.isRequired
}
