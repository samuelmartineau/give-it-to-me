import {
    PICTURE_UPLOAD
} from '../constants/server';

export const openInfosHeight = 70;
export const closeInfosHeight = 50;
export const paddingInfos = 10;

export const wineCard = {
    maxWidth: `${PICTURE_UPLOAD.THUMBNAIL.WIDTH}px`,
    display: 'inline-block',
    position: 'relative',
    height: `${PICTURE_UPLOAD.THUMBNAIL.HEIGHT}px`,
    width: '100%',
    margin: '1em',
};

export const wineCardImageContainer = {
    position: 'absolute',
    top: '0px',
    left: '16px',
    height: '100%',
    display: 'block',
    overflow: 'hidden',
    transition: 'all 0.3s',
};

export const wineCardMainContainer = {
    position: 'absolute',
    top: `${openInfosHeight + 2*paddingInfos}px`,
    padding: '10px',
    left: '16px',
    bottom: '0px',
    display: 'block',
    zIndex: 2,
    right: '0px',
};

export const wineCardImage = {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
};

export const pictureToAvatar = {
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    zIndex: 1,
    top: '12px',
    zIndex: 4,
};

export const wineCardInfos = {
    position: 'absolute',
    right: '0px',
    left: '0px',
    padding: `${paddingInfos}px 16px`,
    paddingLeft: `${paddingInfos}px`,
    color: '#fff',
    transition: 'all 0.3s',
    height: `${closeInfosHeight}px`,
    zIndex: 3,
    textAlign: 'initial',
    top: `calc(100% - ${closeInfosHeight}px)`,
    lineHeight: '22px',
};

export const wineCardInfosOpen = {
    top: '0px',
    height: `${openInfosHeight}px`,
    paddingLeft: '90px',
};

export const wineCardInfosCorner = {
    position: 'absolute',
    left: '0px',
    border: '8px solid',
    transition: 'all 0.3s',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    bottom: 'auto',
    top: '-16px',
};

export const wineCardInfosCornerOpen = {
    bottom: '-16px',
    top: 'auto',
    borderBottomColor: 'transparent',
};

export const wineCardMenuButton = {
    position: 'absolute',
    zIndex: 1,
    top: '16px',
    right: '16px',
    zIndex: 4,
};
