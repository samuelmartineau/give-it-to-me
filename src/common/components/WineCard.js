import React, {Component, PropTypes} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentMenu from 'material-ui/svg-icons/navigation/menu';
import tinycolor from 'tinycolor2';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import {PICTURE_UPLOAD} from '../constants/server';
import Image from '../components/Image';
import * as actions from '../actions';
import {WINE_TYPES, WINE_CATEGORIES} from '../constants/WineTypes';
import {WineFamilies} from '../constants/WineFamilies';
import * as wineCardStyle from '../styles/wineCard';
import CellarSchema from './CellarSchema';

export default class WineCard extends Component {

    state = {
        open: false
    }

    onToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    onAddToBasket = () => {
        const { dispatch, wine } = this.props;
        dispatch(actions.addToBasket(wine.id));
    }

    render() {
        const {wine} = this.props;
        const {open} = this.state;
        const wineColor = WINE_TYPES[wine.wineType];
        const cornerColor = tinycolor(wineColor.color).darken(20).toString();
        const wineCardInfos = {
            ...wineCardStyle.wineCardInfos,
             background: wineColor.color,
         };
         const wineCardInfosCorner = {...wineCardStyle.wineCardInfosCorner,
             borderRightColor: cornerColor,
             borderBottomColor: cornerColor,
         };
         const wineCardImageContainer = {
             ...wineCardStyle.wineCardImageContainer,
         }
        const wineCardMainContainer = {
            ...wineCardStyle.wineCardMainContainer,
            background: tinycolor(wineColor.color).lighten(20).toString(),
        };
        const wineCardMenuButton = {...wineCardStyle.wineCardMenuButton};

        if (open) {
            Object.assign(wineCardInfos, wineCardStyle.wineCardInfosOpen);
            Object.assign(wineCardInfosCorner, wineCardStyle.wineCardInfosCornerOpen, {borderTopColor: cornerColor});
            Object.assign(wineCardImageContainer, wineCardStyle.pictureToAvatar);
            Object.assign(wineCardMenuButton, {top: '55px'});
        }

        return (
            <div style={wineCardStyle.wineCard}>
                <FloatingActionButton
                    mini={true}
                    style={wineCardMenuButton}
                    backgroundColor={wineColor.color}
                    onTouchTap={this.onToggle}
                >
                  <ContentMenu />
                </FloatingActionButton>
                <div style={wineCardImageContainer}>
                    <Image
                        style={wineCardStyle.wineCardImage}
                        width={PICTURE_UPLOAD.THUMBNAIL.WIDTH}
                        height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
                        src={wine.thumbnailFileName}
                        lazyLoader={wine.blur}
                        />
                </div>
                <div style={wineCardInfos}>
                    {!open && <div style={wineCardInfosCorner}/>}
                    <div style={{fontSize: '20px'}}>{wine.name}</div>
                    <div style={{fontSize: '12px'}}>{WineFamilies[wine.wineFamily]}</div>
                    {open && <div style={wineCardInfosCorner}/>}
                </div>
                {open && <div style={wineCardMainContainer}>
                    <CellarSchema
                        wines={[wine]}
                        selectedCells={{}}
                        selectableCells={{}}
                        availableCells={{}}
                     />
                     <div >
                        <Checkbox
                            style={{textAlign: 'initial'}}
                            checkedIcon={<ActionFavorite />}
                            uncheckedIcon={<ActionFavoriteBorder/>}
                            onTouchTap={this.onAddToBasket}
                        />
                     </div>
                </div>}
            </div>
        );
    }
}

WineCard.propTypes = {
    wine: PropTypes.object.isRequired
};
