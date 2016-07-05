import React, {Component, PropTypes} from 'react'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentClose from 'material-ui/svg-icons/navigation/close'

import * as actions from '../actions'
import BoxSchema from './BoxSchema'
import * as cellSelectorStyle from '../styles/cellSelector'
import {WINE_TYPES} from '../constants/WineTypes'
import {SELECTED_COLOR} from '../constants/Cellar'

export default class CellsSelector extends Component {

  constructor (props) {
    super(props)
    this.selectBox = this.selectBox.bind(this)
    this.unselectBox = this.unselectBox.bind(this)
    this.selectCell = this.selectCell.bind(this)
  }

  selectCell (cellId) {
    const {
      dispatch,
      selectedCells,
      boxId
    } = this.props
    const isCellAlreadySelected = selectedCells[boxId].indexOf(cellId) > -1
    if (isCellAlreadySelected) {
      dispatch(actions.unselectCell(boxId, cellId))
    } else {
      dispatch(actions.selectCell(boxId, cellId))
    }
  }

  selectBox (event, index, value) {
    const {dispatch, boxId} = this.props
    dispatch(actions.unselectBox(boxId))
    dispatch(actions.selectBox(value))
  }

  unselectBox () {
    const {dispatch, boxId} = this.props
    dispatch(actions.unselectBox(boxId))
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
        <SelectField value={boxId} onChange={this.selectBox}>
          {selectableBoxes.map((id, index) => <MenuItem key={index} value={id} primaryText={id} />)}
        </SelectField>
        {Object.keys(selectedCells).length > 1
          ? <FloatingActionButton
              style={cellSelectorStyle.cellSelectorCloseButton}
              mini
              secondary
              onTouchTap={this.unselectBox}>
            <ContentClose />
          </FloatingActionButton>
          : null
        }
        <BoxSchema
          selectableCells={availableCells[boxId]}
          onSelectCell={this.selectCell}
          bottlesToDraw={bottlesToDraw}
          boxId={boxId}
          isCellClickable={(cellId) => {
            const isCellAvailable = availableCells[boxId].indexOf(cellId) > -1
            const moreThanOneCellSeltected = selectedCells[boxId].length > 1
            const notAlreadySelected = selectedCells[boxId].indexOf(cellId) === -1
            return isCellAvailable && (moreThanOneCellSeltected || notAlreadySelected)
          }}
          isCellDisabled={(cellId) => {
            return availableCells[boxId].indexOf(cellId) > -1
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
