import React, {PropTypes} from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import BoxSchema from './BoxSchema'
import {WINE_TYPES} from '../constants/WineTypes'

const WineRemove = ({wine, removeBottle, removeBottles, updateBottleCount, removeBottlesCount}) => {
  const color = WINE_TYPES[wine.wineType].color
  const isButtonDisabled = removeBottlesCount < 1 || removeBottlesCount > wine.count
  const bottlesByBoxes = wine.isInBoxes ? wine.bottles.reduce((acc, bottle) => {
    if (acc[bottle.box]) {
      acc[bottle.box].push(bottle)
    } else {
      acc[bottle.box] = [bottle]
    }
    return acc
  }, {}) : {}

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {wine.isInBoxes ? Object.keys(bottlesByBoxes).map((boxId, index) =>
        <div key={index} style={{flex: 1, margin: '1em', minWidth: '250px', maxWidth: '400px'}}>
          <h1>Caisse {boxId}</h1>
          <p>Cliquer sur la bouteille à supprimer</p>
          <BoxSchema
            selectableCells={bottlesByBoxes[boxId].map(bottle => bottle.cell)}
            onSelectCell={cellId => {
              const bottle = bottlesByBoxes[boxId].find(bottle => bottle.cell === cellId)
              removeBottle(bottle)
            }}
            bottlesToDraw={bottlesByBoxes[boxId].map(bottle => ({
              color: color,
              box: boxId,
              cell: bottle.cell,
              isBoxSchema: true
            }))}
            boxId={parseInt(boxId)}
            isCellClickable={(cellId) => {
              return bottlesByBoxes[boxId].map(bottle => bottle.cell).indexOf(cellId) > -1
            }}
            isCellDisabled={(cellId) => {
              return bottlesByBoxes[boxId].map(bottle => bottle.cell).indexOf(cellId) === -1
            }}
             />
        </div>
      ) : <div>
        <h2>Nombre de bouteille: {wine.count}</h2>
        <p>Cliquer sur la bouteille à supprimer</p>
        <TextField
          type='number'
          value={removeBottlesCount}
          onChange={updateBottleCount}
          floatingLabelText='Nombre de bouteilles à supprimer'
          />
        <RaisedButton
          onTouchTap={removeBottles}
          disabled={isButtonDisabled}
          label='Supprimer'
          secondary />
      </div>}
    </div>
  )
}

WineRemove.propTypes = {
  wine: PropTypes.object.isRequired
}

export default WineRemove
