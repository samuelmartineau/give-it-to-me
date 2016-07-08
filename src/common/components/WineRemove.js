import React, {PropTypes} from 'react'

import BoxSchema from './BoxSchema'
import {WINE_TYPES} from '../constants/WineTypes'

const WineRemove = ({wine, removeBottle}) => {
  const color = WINE_TYPES[wine.wineType].color
  const bottlesByBoxes = wine.isInBoxes ? wine.bottles.reduce((acc, bottle) => {
    if (acc[bottle.box]) {
      acc[bottle.box].push(bottle.cell)
    } else {
      acc[bottle.box] = [bottle.cell]
    }
    return acc
  }, {}) : {}

  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {wine.isInBoxes ? Object.keys(bottlesByBoxes).map((boxId, index) =>
        <div key={index} style={{flex: 1, margin: '1em', minWidth: '250px', maxWidth: '400px'}}>
          <p>Caisse {boxId}</p>
          <BoxSchema
            selectableCells={bottlesByBoxes[boxId]}
            onSelectCell={cellId => {
              removeBottle(parseInt(boxId), cellId)
            }}
            bottlesToDraw={bottlesByBoxes[boxId].map((cell) => ({
              color: color,
              box: boxId,
              cell: cell,
              isBoxSchema: true
            }))}
            boxId={parseInt(boxId)}
            isCellClickable={(cellId) => {
              return bottlesByBoxes[boxId].indexOf(cellId) > -1
            }}
            isCellDisabled={(cellId) => {
              return bottlesByBoxes[boxId].indexOf(cellId) === -1
            }}
             />
        </div>
        ) : 'sam'}
    </div>
  )
}

WineRemove.propTypes = {
  wine: PropTypes.object.isRequired
}

export default WineRemove
