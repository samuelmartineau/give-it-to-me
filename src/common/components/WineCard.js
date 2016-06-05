import React, {Component, PropTypes} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentMenu from 'material-ui/svg-icons/navigation/menu';
import tinycolor from 'tinycolor2';

import {PICTURE_UPLOAD} from '../constants/server';
import Image from '../components/Image';
import {WINE_TYPES, WINE_CATEGORIES} from '../constants/WineTypes';
import {WineFamilies} from '../constants/WineFamilies';
import * as wineCardStyle from '../styles/wineCard';

const WineCard = ({wine}) => {
    const wineColor = WINE_TYPES[wine.wineType];
    const wineCardInfos = {...wineCardStyle.wineCardInfos, background: wineColor.color};
    const wineCardInfosCorner = {...wineCardStyle.wineCardInfosCorner,
        borderRightColor: tinycolor(wineColor.color).darken(20).toString(),
        borderBottomColor: tinycolor(wineColor.color).darken(20).toString(),
    };

    return (
        <div style={wineCardStyle.wineCard}>
            <FloatingActionButton mini={true} style={wineCardStyle.wineCardMenuButton} backgroundColor={wineColor.color}>
              <ContentMenu />
            </FloatingActionButton>
            <div style={wineCardStyle.wineCardImageContainer}>
                <Image
                    style={wineCardStyle.wineCardImage}
                    width={PICTURE_UPLOAD.THUMBNAIL.WIDTH}
                    height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
                    src={wine.thumbnailFileName}
                    lazyLoader={wine.blur}
                    />
            </div>
            <div style={wineCardInfos}>
                <div style={wineCardInfosCorner}/>
                <h1>{wine.name}</h1>
                <p>{WineFamilies[wine.wineFamily]}</p>
            </div>
        </div>
    );
}

WineCard.propTypes = {
    wine: PropTypes.object.isRequired
};

export default WineCard;
