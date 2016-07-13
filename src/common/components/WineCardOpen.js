import React, {PropTypes} from 'react'
import tinycolor from 'tinycolor2'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import PhotoIcon from 'material-ui/svg-icons/image/photo'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

import * as wineCardStyle from '../styles/wineCard'
import {WINE_TYPES} from '../constants/WineTypes'
import {BOTTLE_TYPES} from '../constants/BottleTypes'
import CellarSchema from './CellarSchema'
import WineCardModal from './WineCardModal'

const WineCardOpen = ({wine, favoriteWine, handleFavorite, dispatch}) => {
  const wineColor = WINE_TYPES[wine.wineType]
  const wineCardMainContainer = {
    ...wineCardStyle.wineCardMainContainer,
    background: tinycolor(wineColor.color).lighten(20).toString()
  }
  const bottleType = BOTTLE_TYPES[wine.bottleType]

  return (
    <div style={wineCardMainContainer}>
      {wine.isInBoxes ? (
        <CellarSchema
          viewMode
          isBoxClickable={() => {}}
          wines={[wine]}
          wine={wine}
          selectedCells={{}}
          selectableCells={{}}
          availableCells={{}} />
      ) : <div>
        {wine.positionComment}
        {wine.count}
      </div>}
      <div>Millésime: {wine.year}</div>
      <div>Taille: {bottleType.label} ({bottleType.capacity}L)</div>
      <Checkbox
        label='Favoris'
        style={{textAlign: 'initial'}}
        checked={favoriteWine}
        checkedIcon={< ActionFavorite />}
        uncheckedIcon={< ActionFavoriteBorder />}
        onTouchTap={handleFavorite} />
      <FlatButton
        label='Voir la Photo'
        rel='nofollow'
        target='_blank'
        href={wine.pictureFileName}
        primary
        icon={<PhotoIcon />}
      />
      <WineCardModal
        dispatch={dispatch}
        wine={wine} />
    </div>
  )
}

WineCardOpen.propTypes = {
  wine: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default WineCardOpen
