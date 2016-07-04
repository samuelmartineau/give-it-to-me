import React, {Component, PropTypes} from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentMenu from 'material-ui/svg-icons/navigation/menu'
import tinycolor from 'tinycolor2'
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import ActionFavorite from 'material-ui/svg-icons/action/favorite'
import PhotoIcon from 'material-ui/svg-icons/image/photo'
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border'

import {PICTURE_UPLOAD} from '../constants/server'
import Image from '../components/Image'
import * as actions from '../actions'
import {WINE_TYPES} from '../constants/WineTypes'
import {WineFamilies} from '../constants/WineFamilies'
import * as wineCardStyle from '../styles/wineCard'
import CellarSchema from './CellarSchema'

export default class WineCard extends Component {

  state = {
    open: false
  }

  onToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  handleBasket = () => {
    const {dispatch, wine, basketWine} = this.props
    if (basketWine) {
      dispatch(actions.removeFromBasket(basketWine.id))
    } else {
      dispatch(actions.addToBasket(wine.id))
    }
  }

  render () {
    const {wine, basketWine} = this.props
    const {open} = this.state
    const wineColor = WINE_TYPES[wine.wineType]
    const cornerColor = tinycolor(wineColor.color).darken(20).toString()
    const wineCardInfos = {
      ...wineCardStyle.wineCardInfos,
      background: wineColor.color
    }
    const wineCardInfosCorner = {
      ...wineCardStyle.wineCardInfosCorner,
      borderRightColor: cornerColor,
      borderBottomColor: cornerColor
    }
    const wineCardImageContainer = {
      ...wineCardStyle.wineCardImageContainer
    }
    const wineCardMainContainer = {
      ...wineCardStyle.wineCardMainContainer,
      background: tinycolor(wineColor.color).lighten(20).toString()
    }
    const wineCardMenuButton = {
      ...wineCardStyle.wineCardMenuButton
    }

    if (open) {
      Object.assign(wineCardInfos, wineCardStyle.wineCardInfosOpen)
      Object.assign(wineCardInfosCorner, wineCardStyle.wineCardInfosCornerOpen, {borderTopColor: cornerColor})
      Object.assign(wineCardImageContainer, wineCardStyle.pictureToAvatar)
      Object.assign(wineCardMenuButton, wineCardStyle.wineCardMenuButtonOpen)
    }

    return (
      <div style={wineCardStyle.wineCard}>
        <FloatingActionButton mini style={wineCardMenuButton} backgroundColor={wineColor.color} onTouchTap={this.onToggle}>
          <ContentMenu />
        </FloatingActionButton>
        <div style={wineCardImageContainer}>
          <Image style={wineCardStyle.wineCardImage} width={PICTURE_UPLOAD.THUMBNAIL.WIDTH} height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT} src={wine.thumbnailFileName} lazyLoader={wine.blur} />
        </div>
        {open && <div style={wineCardMainContainer}>
          {wine.isInBoxes ? <CellarSchema viewMode wines={[wine]} wine={wine} selectedCells={{}} selectableCells={{}} availableCells={{}} /> : wine.positionComment}
          <div>Millésime: {wine.year}</div>
          <Checkbox
            style={{textAlign: 'initial'}}
            checked={basketWine}
            checkedIcon={< ActionFavorite />}
            uncheckedIcon={< ActionFavoriteBorder />}
            onTouchTap={this.handleBasket} />
          <FlatButton
            label='Agrandir photo'
            linkButton
            rel='nofollow'
            target='_blank'
            href={wine.pictureFileName}
            primary
            icon={<PhotoIcon />}
          />
        </div>}
        <div style={wineCardInfosCorner} />
        <div style={wineCardInfos}>
          <div style={{
            fontSize: '20px'
          }}>{wine.name}</div>
          <div style={{
            fontSize: '12px'
          }}>{WineFamilies[wine.wineFamily]}</div>
        </div>
      </div>
    )
  }
}

WineCard.propTypes = {
  wine: PropTypes.object.isRequired,
  basketWine: PropTypes.object
}
