import {
    PICTURE_UPLOAD
} from '../constants/server';

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
    left: '16px',
    height: '100%',
    display: 'block',
    overflow: 'hidden',
};

export const wineCardImage = {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
};

export const wineCardInfos = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: '10px 16px',
    color: '#fff',
};

export const wineCardInfosCorner = {
    position: 'absolute',
    left: '0',
    top: '-16px',
    width: 0,
    border: '8px solid',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
};

export const wineCardMenuButton = {
    position: 'absolute',
    zIndex: 1,
    top: '16px',
    right: '16px'
};
