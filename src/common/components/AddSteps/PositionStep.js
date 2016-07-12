import React from 'react'

import CellarSchema from '../CellarSchema'
import CellsSelectors from '../CellsSelectors'
import Toggle from 'material-ui/Toggle'
import TextField from 'material-ui/TextField'

import {unselectBox, selectBox} from '../../actions'

const PositionStep = (props) => {
  const {
    onPositionOrigin,
    isInBoxes,
    availableCells,
    positionComment,
    handlePositionComment,
    count,
    handleCount,
    dispatch,
    selectedCells,
    wines
  } = props
  return (
    <div>
      <Toggle
        label='Les bouteilles sont-elles dans les caisses?'
        defaultToggled={isInBoxes}
        onToggle={onPositionOrigin}
      />
      {isInBoxes && (
        <CellarSchema
          wines={wines}
          selectedCells={selectedCells}
          availableCells={availableCells}
          onSelectBox={(boxId) => {
            const isBoxAlreadySelected = selectedCells[boxId]
            if (isBoxAlreadySelected && Object.keys(selectedCells).length > 1) {
              dispatch(unselectBox(boxId))
            } else {
              dispatch(selectBox(boxId))
            }
          }}
          isBoxClickable={(boxId) => {
            const moreThanOneBoxSeltected = Object.keys(selectedCells).length > 1
            const notAlreadySelected = !selectedCells[boxId]
            return availableCells[boxId] && (moreThanOneBoxSeltected || notAlreadySelected)
          }}
          selectMode
        />
      )}
      {isInBoxes && <CellsSelectors {...props} />}
      {isInBoxes || <TextField
        value={positionComment}
        floatingLabelText='Commentaire sur la position'
        onChange={handlePositionComment} />
      }
      {isInBoxes || <TextField
        value={count}
        type='number'
        floatingLabelText='Nombre de bouteille'
        onChange={handleCount} />
      }
    </div>
  )
}

export default PositionStep
