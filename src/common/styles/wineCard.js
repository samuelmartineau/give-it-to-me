import {PICTURE_UPLOAD} from '../constants/server'

export const openInfosHeight = 70
export const closeInfosHeight = 50
export const paddingInfos = 10

export const wineCard = {
  maxWidth: `${PICTURE_UPLOAD.THUMBNAIL.WIDTH}px`,
  display: 'inline-block',
  position: 'relative',
  height: `${PICTURE_UPLOAD.THUMBNAIL.HEIGHT}px`,
  width: '100%',
  margin: '1em'
}

export const wineCardImageContainer = {
  position: 'absolute',
  top: '0px',
  left: '16px',
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
  display: 'block',
  maxWidth: '100%',
  height: 'auto'
}

export const pictureToAvatar = {
  borderRadius: '50%',
  left: '0px',
  transform: 'scale(0.25, 0.18) translate(-420px, -860px)',
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
  textAlign: 'initial',
  top: `calc(100% - ${openInfosHeight}px)`,
  lineHeight: '22px'
}

export const wineCardInfosOpen = {
  transform: 'translate(0px, -330px)',
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
  top: '314px'
}

export const wineCardInfosCornerOpen = {
  borderBottomColor: 'transparent',
  transform: 'translate(0px, -224px)'
}

export const wineCardMenuButton = {
  position: 'absolute',
  top: '16px',
  right: '16px',
  zIndex: 4
}

export const wineCardMenuButtonOpen = {transform: 'translate(0px, 40px)'}
