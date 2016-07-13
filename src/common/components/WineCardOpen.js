import React, {PropTypes} from 'react'
import tinycolor from 'tinycolor2'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import PhotoIcon from 'material-ui/svg-icons/image/photo'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

import * as wineCardStyle from '../styles/wineCard'
import {WINE_TYPES, WINE_CATEGORIES} from '../constants/WineTypes'
import {BOTTLE_TYPES} from '../constants/BottleTypes'
import CellarSchema from './CellarSchema'
import WineCardModal from './WineCardModal'
import {WineFamilies} from '../constants/WineFamilies'

const WineCardOpen = ({wine, favoriteWine, handleFavorite, dispatch}) => {
  const wineColor = WINE_TYPES[wine.wineType]
  const wineCardMainContainer = {
    ...wineCardStyle.wineCardMainContainer,
    background: tinycolor(wineColor.color).lighten(20).toString()
  }
  const bottleType = BOTTLE_TYPES[wine.bottleType]
  const count = wine.isInBoxes ? wine.bottles.length : wine.count
  return (
    <div style={wineCardMainContainer}>
      {wine.isInBoxes && (
        <CellarSchema
          viewMode
          isBoxClickable={() => {}}
          wines={[wine]}
          wine={wine}
          selectedCells={{}}
          selectableCells={{}}
          availableCells={{}} />
      )}
      <div style={{fontSize: '20px', lineHeight: '24px', textAlign: 'center'}}>
        <div>Millésime: {wine.year}</div>
        <div style={{color: '#20e209'}}>AOC: {WineFamilies[wine.wineFamily]}</div>
        <div>Nombre: {count}</div>
        <div>Taille: {bottleType.label} ({bottleType.capacity}L)</div>
        <div>Texture: {WINE_CATEGORIES[wine.wineCategory].label}</div>
        {wine.positionComment && <div>Source: {wine.positionComment}</div>}
        {wine.source && <div>Source: {wine.source}</div>}
      </div>

      <div style={{position: 'absolute', bottom: 0, right: 0,
          left: 0,
          margin: '10px'
        }}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Checkbox
            label='Favoris'
            style={{textAlign: 'initial', width: '50%'}}
            checked={favoriteWine}
            checkedIcon={< ActionFavorite />}
            uncheckedIcon={< ActionFavoriteBorder />}
            onTouchTap={handleFavorite} />
          <FlatButton
            style={{width: '50%'}}
            label='Photo'
            rel='nofollow'
            target='_blank'
            href={wine.pictureFileName}
            primary
            icon={<PhotoIcon />}
          />
        </div>
        <WineCardModal
          dispatch={dispatch}
          wine={wine} />
      </div>
    </div>
  )
}

WineCardOpen.propTypes = {
  wine: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default WineCardOpen
