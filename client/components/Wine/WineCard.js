import React from 'react';
import tinycolor from 'tinycolor2';
import fontColorContrast from 'font-color-contrast';
import { PICTURE_UPLOAD, wineTypes } from '~/config';
import styled from 'styled-components';
import { buildAssetsUrl } from '~/config';

import { Image } from '../Image/Image';
import { WineType } from './Wine.type';

const { WINE_TYPES } = wineTypes;
const openInfosHeight = 70;
const closeInfosHeight = 50;
const paddingInfos = 10;

const WineCardWrapper = styled.div`
  width: ${PICTURE_UPLOAD.THUMBNAIL.WIDTH + 16}px;
  display: inline-block;
  position: relative;
  height: ${PICTURE_UPLOAD.THUMBNAIL.HEIGHT +
    closeInfosHeight +
    2 * paddingInfos}px;
  margin: 1em;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 4;
  transition: transform 0.2s;
  ${({ open }) =>
    open &&
    `
    transform: translate(20px,-20px);
  `};
`;
const WineCardImageContainer = styled.a`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 100%;
  display: block;
  overflow: hidden;
  transition: transform 0.2s;
  ${({ open }) =>
    open &&
    `
    margin-left: 0px;
    width: 100%;
    height: '100%';
    border-radius: 50%;
    transform: scale(0.21,0.14) translate(-550px,-1350px);
    z-index: 4;
  `};
`;

const WineImage = styled(Image)`
  margin-left: 16px;
  ${({ open }) =>
    open &&
    `
    height: 100%;
    width: 100%;
    margin-left: 0px;
  `};
`;

const WineCardContainer = styled.div`
  position: absolute;
  top: ${openInfosHeight + 2 * paddingInfos}px;
  padding: 10px;
  left: 16px;
  bottom: 0px;
  display: block;
  z-index: 2;
  right: 0px;
`;

const WineCorner = styled.div`
  position: absolute;
  border: 8px solid;
  transition: transform 0.2s;
  border-left-color: transparent;
  border-top-color: transparent;
  bottom: auto;
  top: ${PICTURE_UPLOAD.THUMBNAIL.HEIGHT - 16}px;
  ${({ open }) =>
    open &&
    `
    border-bottom-color: transparent;
    transform: translate(0px, -294px);
  `};
`;
const WinePane = styled.div`
  position: absolute;
  right: 0px;
  left: 0px;
  padding: ${paddingInfos}px 16px;
  padding-left: ${paddingInfos}px;
  transition: transform 0.2s;
  height: ${closeInfosHeight}px;
  z-index: 3;
  justify-content: center;
  align-items: center;
  display: flex;
  top: ${PICTURE_UPLOAD.THUMBNAIL.HEIGHT}px;
  ${({ open }) =>
    open &&
    `
    transform: translate(0px, -${PICTURE_UPLOAD.THUMBNAIL.HEIGHT}px);
    height: ${openInfosHeight}px;
    padding-left: 80px;
    padding-right: '80px';
  `};
`;

type WineCardProps = {
  wine: WineType,
  children: Function,
  className: string
};

export class WineCard extends React.Component<WineCardProps> {
  state = { open: false };

  onToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { wine = {}, children } = this.props;
    const { open } = this.state;
    const wineColor = WINE_TYPES[wine.wineType].color;
    const textColor = fontColorContrast(wineColor);
    const softColor = tinycolor(wineColor)
      .lighten(20)
      .toString();
    const cornerColor = tinycolor(wineColor)
      .darken(20)
      .toString();

    return (
      <WineCardWrapper className={this.props.className}>
        <MenuButton
          open={open}
          type="button"
          onClick={this.onToggle}
          style={{ background: softColor, color: textColor }}
        >
          <i className="material-icons">menu</i>
        </MenuButton>
        <WineCardImageContainer
          open={open}
          href={buildAssetsUrl(wine.pictureFileName)}
          target="_blank"
        >
          <WineImage
            open={open}
            width={PICTURE_UPLOAD.THUMBNAIL.WIDTH}
            height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
            src={buildAssetsUrl(wine.pictureFileName)}
            lazyLoader={wine.blur}
          />
        </WineCardImageContainer>
        {open && (
          <WineCardContainer
            style={{ background: softColor, color: textColor }}
          >
            {children(wine)}
          </WineCardContainer>
        )}
        <WineCorner
          open={open}
          style={
            open
              ? { borderRightColor: cornerColor, borderTopColor: cornerColor }
              : {
                  borderRightColor: cornerColor,
                  borderBottomColor: cornerColor
                }
          }
        />
        <WinePane
          open={open}
          style={{ background: wineColor, color: textColor }}
        >
          {wine.name}
        </WinePane>
      </WineCardWrapper>
    );
  }
}
