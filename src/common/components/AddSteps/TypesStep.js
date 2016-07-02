import React from 'react'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import tinycolor from 'tinycolor2'

import {WINE_TYPES, WINE_CATEGORIES} from '../../constants/WineTypes'
import {BOTTLE_TYPES} from '../../constants/BottleTypes'

const types = Object.keys(WINE_TYPES).map(type => {
  return {
    ...WINE_TYPES[type],
    ... {
      value: type
    }
  }
})

const bottleTypes = Object.keys(BOTTLE_TYPES).map(key => {
  return {
    value: key,
    ...BOTTLE_TYPES[key]
  }
})

const TypesStep = ({
  handleWineType,
  handleWineCategory,
  handleBottleType,
  wineType,
  wineCategory,
  bottleType
}) => {
  const categories = WINE_TYPES[wineType].categories.map(category => {
    return {
      value: category,
      ...WINE_CATEGORIES[category]
    }
  })

  return (
    <div>
      <h2>Famille</h2>
      <RadioButtonGroup onChange={handleWineType} name='wine-type' valueSelected={wineType}>
        {types.map((type, index) => (<RadioButton labelStyle={{
          color: tinycolor(type.color)
        }} key={index} value={type.value} label={type.label}/>))}
      </RadioButtonGroup>
      <h2>Type</h2>
      <RadioButtonGroup onChange={handleWineCategory} name='wine-category' valueSelected={wineCategory}>
        {categories.map((category, index) => (<RadioButton key={index} value={category.value} label={category.label}/>))}
      </RadioButtonGroup>
      <h2>Taille de la bouteille</h2>
      <RadioButtonGroup onChange={handleBottleType} name='bottle-type' valueSelected={bottleType}>
        {bottleTypes.map((bottle, index) => (<RadioButton key={index} value={bottle.value} label={bottle.label}/>))}
      </RadioButtonGroup>
    </div>
  )
}

export default TypesStep
