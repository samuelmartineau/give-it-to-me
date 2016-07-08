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

const WineCardOpen = ({wine, basketWine, handleBasket, dispatch}) => {
  const wineColor = WINE_TYPES[wine.wineType]
  const wineCardMainContainer = {
    ...wineCardStyle.wineCardMainContainer,
    background: tinycolor(wineColor.color).lighten(20).toString()
  }
  const bottleType = BOTTLE_TYPES[wine.bottleType]

  return (
    <div style={wineCardMainContainer}>
      {wine.isInBoxes ? <CellarSchema viewMode wines={[wine]} wine={wine} selectedCells={{}} selectableCells={{}} availableCells={{}} /> : wine.positionComment}
      <div>Millésime: {wine.year}</div>
      <div>Taille: {bottleType.label} ({bottleType.capacity}L)</div>
      <Checkbox
        style={{textAlign: 'initial'}}
        checked={basketWine}
        checkedIcon={< ActionFavorite />}
        uncheckedIcon={< ActionFavoriteBorder />}
        onTouchTap={handleBasket} />
      <FlatButton
        label='Voir la Photo'
        linkButton
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
