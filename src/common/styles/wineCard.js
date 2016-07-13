import {PICTURE_UPLOAD} from '../constants/server'

export const openInfosHeight = 70
export const closeInfosHeight = 50
export const paddingInfos = 10

export const wineCard = {
  width: `${PICTURE_UPLOAD.THUMBNAIL.WIDTH + 16}px`,
  display: 'inline-block',
  position: 'relative',
  height: `${PICTURE_UPLOAD.THUMBNAIL.HEIGHT + closeInfosHeight}px`,
  margin: '1em'
}

export const wineCardImageContainer = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  right: '0px',
  height: '100%',
  display: 'block',
  overflow: 'hidden',
  transition: 'transform 0.3s'
}

export const wineCardMainContainer = {
  position: 'absolute',
  top: `${openInfosHeight + 2 * paddingInfos}px`,
  padding: '10px',
  left: '16px',
  bottom: '0px',
  display: 'block',
  zIndex: 2,
  right: '0px'
}

export const wineCardImage = {
  marginLeft: '16px'
}
export const wineCardImageOpen = {
  marginLeft: '0px',
  width: '100%',
  height: '100%'
}

export const pictureToAvatar = {
  borderRadius: '50%',
  transform: 'scale(0.24, 0.17) translate(-470px, -1060px)',
  zIndex: 4
}

export const wineCardInfos = {
  position: 'absolute',
  right: '0px',
  left: '0px',
  padding: `${paddingInfos}px 16px`,
  paddingLeft: `${paddingInfos}px`,
  color: '#fff',
  transition: 'transform 0.3s',
  height: `${closeInfosHeight}px`,
  zIndex: 3,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  top: `${PICTURE_UPLOAD.THUMBNAIL.HEIGHT}px`
}

export const wineCardInfosOpen = {
  transform: `translate(0px, -${PICTURE_UPLOAD.THUMBNAIL.HEIGHT}px)`,
  height: `${openInfosHeight}px`,
  paddingLeft: '90px'
}

export const wineCardInfosCorner = {
  position: 'absolute',
  border: '8px solid',
  transition: 'transform 0.3s',
  borderLeftColor: 'transparent',
  borderTopColor: 'transparent',
  bottom: 'auto',
  top: `${PICTURE_UPLOAD.THUMBNAIL.HEIGHT - 16}px`
}

export const wineCardInfosCornerOpen = {
  borderBottomColor: 'transparent',
  transform: 'translate(0px, -294px)'
}

export const wineCardMenuButton = {
  position: 'absolute',
  top: '16px',
  right: '16px',
  zIndex: 4
}

export const wineCardMenuButtonOpen = {transform: 'translate(0px, 40px)'}
