import React, {Component, PropTypes} from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentMenu from 'material-ui/svg-icons/navigation/menu'
import tinycolor from 'tinycolor2'

import {PICTURE_UPLOAD} from '../constants/server'
import Image from './Image'
import WineCardOpen from './WineCardOpen'
import {addToBasket, removeFromBasket} from '../actions'
import {WINE_TYPES} from '../constants/WineTypes'
import {WineFamilies} from '../constants/WineFamilies'
import * as wineCardStyle from '../styles/wineCard'

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
      dispatch(removeFromBasket(basketWine.id))
    } else {
      dispatch(addToBasket(wine.id))
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
        {open && <WineCardOpen
            wine={wine}
            basketWine={basketWine}
            handleBasket={this.handleBasket}
          />}
        <div style={wineCardInfosCorner} />
        <div style={wineCardInfos}>
          <div style={{
            fontSize: '20px'
          }}>{wine.name}</div>
          <div style={{
            fontSize: '12px',
            lineHeight: '14px'
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
