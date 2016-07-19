import React, {PropTypes} from 'react'
import tinycolor from 'tinycolor2'

import * as bottleTypeStyle from '../styles/bottleType'
import {BOTTLE_TYPES} from '../constants/BottleTypes'
const items = Object.keys(BOTTLE_TYPES).length

const BottleType = ({bottleType, onBottleTypeChange, typeSelected}) => {
  let bottleDrawCompute = {
    ...bottleTypeStyle.bottleDraw
  }
  const percent = 50 + Math.floor((parseInt(bottleType.value) + 1) / items * 50)
  bottleDrawCompute.width = `${percent}%`
  bottleDrawCompute.height = `${percent}%`

  if (bottleType.value === typeSelected) {
    bottleDrawCompute.background = tinycolor('black')
  } else {
    bottleDrawCompute.background = tinycolor('black').setAlpha(0.2)
    bottleDrawCompute.color = 'grey'
  }

  return (
    <div style={bottleTypeStyle.bottle}>
      <div style={bottleDrawCompute} onClick={onBottleTypeChange.bind(null, bottleType)}>
        <div style={bottleTypeStyle.title}>
          <span style={bottleTypeStyle.titleText}>{bottleType.label}</span>
        </div>
      </div>
      <div style={bottleTypeStyle.bottleTypeBefore} />
    </div>
  )
}

BottleType.propTypes = {
  bottleType: PropTypes.object.isRequired,
  typeSelected: PropTypes.string.isRequired,
  onBottleTypeChange: PropTypes.func.isRequired
}

export default BottleType
