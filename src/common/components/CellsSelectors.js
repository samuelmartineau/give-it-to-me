import React, {Component, PropTypes} from 'react'
import ContentAdd from 'material-ui/svg-icons/content/add'
import RaisedButton from 'material-ui/RaisedButton'

import {selectNextBox, selectBox, unselectBox, unselectCell, selectCell} from '../actions'
import CellsSelector from './CellsSelector'
import * as cellSelectorStyle from '../styles/cellSelector'

export default class CellsSelectors extends Component {
  onSelectNextBox = () => {
    const {dispatch} = this.props
    dispatch(selectNextBox())
  }

  onSelectCell = (boxId, cellId) => {
    const {
      dispatch,
      selectedCells
    } = this.props
    const isCellAlreadySelected = selectedCells[boxId].indexOf(cellId) > -1
    if (isCellAlreadySelected) {
      dispatch(unselectCell(boxId, cellId))
    } else {
      dispatch(selectCell(boxId, cellId))
    }
  }

  onSelectBox = (boxId, evt, index, value) => {
    const {dispatch} = this.props
    dispatch(unselectBox(boxId))
    dispatch(selectBox(value))
  }

  onUnselectBox = (boxId) => {
    const {dispatch} = this.props
    dispatch(unselectBox(boxId))
  }

  render () {
    const {selectedCells, selectableCells, bottlesByBoxes, availableCells} = this.props

    return (
      <div>
        <div style={cellSelectorStyle.cellSelectorAddButton}>
          <RaisedButton
            onClick={this.onSelectNextBox}
            label='Ajouter une caisse'
            labelPosition='after'
            primary
            icon={< ContentAdd />} />
        </div>
        <div style={cellSelectorStyle.cellSelectorContainer}>
          {Object.keys(selectedCells).map((box, index) => {
            const boxId = box
            return <CellsSelector
              key={index}
              isRemovable={Object.keys(selectedCells).length > 1}
              selectableCells={availableCells[boxId]}
              selectedCells={selectedCells[boxId]}
              bottlesByBoxes={bottlesByBoxes}
              selectableBoxes={Object.keys(selectableCells)
                .filter(boxId => Object.keys(selectedCells).indexOf(boxId) === -1)
                .map(boxId => parseInt(boxId))
                .concat([parseInt(box)])
                .sort((a, b) => a - b)}
              isCellClickable={(cellId) => {
                const isCellAvailable = availableCells[boxId].indexOf(cellId) > -1
                const moreThanOneCellSeltected = selectedCells[boxId].length > 1
                const notAlreadySelected = selectedCells[boxId].indexOf(cellId) === -1
                return isCellAvailable && (moreThanOneCellSeltected || notAlreadySelected)
              }}
              isCellDisabled={(cellId) => {
                const isCellUnavailable = availableCells[boxId].indexOf(cellId) === -1
                const onlyOneCellSeleted = selectedCells[boxId].length === 1
                const currentCellIsSelected = selectedCells[boxId][0] === cellId
                return onlyOneCellSeleted && currentCellIsSelected || isCellUnavailable
              }}
              boxId={parseInt(box)}
              onSelectCell={this.onSelectCell.bind(this, boxId)}
              onSelectBox={this.onSelectBox.bind(this, boxId)}
              onUnselectBox={this.onUnselectBox.bind(this, boxId)}
            />
          })}
        </div>
      </div>
    )
  }
}

CellsSelectors.propTypes = {
  availableCells: PropTypes.object.isRequired,
  bottlesByBoxes: PropTypes.object.isRequired,
  selectedCells: PropTypes.object.isRequired,
  selectableCells: PropTypes.object.isRequired
}
