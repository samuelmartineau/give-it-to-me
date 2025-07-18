import React, { FC, useState } from 'react';
import tinycolor from 'tinycolor2';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import fontColorContrast from 'font-color-contrast';
import config from '~/config';

import { Image } from '../Image/Image';
import { WineEnhanced } from '@/Cellar.type';

const { WINE_TYPES } = config.wineTypes;
const openInfosHeight = 90;
const closeInfosHeight = 90;
const paddingInfos = 10;

const WineCardWrapper = styled.div`
  width: ${config.PICTURE_UPLOAD.THUMBNAIL.WIDTH}px;
  display: inline-block;
  position: relative;
  height: ${config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT + closeInfosHeight}px;
  margin: 1em;
  ${(props) => props.theme.media.handheld`
  margin: 0.5em 0;
`};
`;

const MenuButton = styled.button<{ open: boolean }>`
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 10px;
  z-index: 4;
  transition: transform 0.2s;
  ${({ open }) =>
    open &&
    `
    padding: 5px;
    transform: translate(20px,-20px);
  `};
`;
const WineCardImageContainer = styled.a<{ open: boolean }>`
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
    transform: scale(0.21,0.14) translate(-520px,-1440px);
    z-index: 4;
  `};
`;

const WineImage = styled(Image)<{ open: boolean }>`
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
  top: ${openInfosHeight}px;
  padding: 10px;
  left: 16px;
  bottom: 0px;
  display: block;
  z-index: 2;
  right: 0px;
`;

const WineCorner = styled.div<{ open: boolean }>`
  position: absolute;
  border: 8px solid;
  transition: transform 0.2s;
  border-left-color: transparent;
  border-top-color: transparent;
  bottom: auto;
  top: ${config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT - 16}px;
  ${({ open }) =>
    open &&
    `
    border-bottom-color: transparent;
    transform: translate(0px, -294px);
  `};
`;
const WinePane = styled.div<{ open: boolean }>`
  font-family: 'Ranga', cursive;
  font-display: swap;
  font-size: 20px;
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
  top: ${config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT}px;
  ${({ open }) =>
    open &&
    `
    transform: translate(0px, -${config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT}px);
    height: ${openInfosHeight}px;
    padding-left: 80px;
    padding-right: 80px;
    font-size: 18px;
  `};
`;

type WineCardProps = {
  wine: WineEnhanced;
  className?: string;
  children: (wine: WineEnhanced) => React.ReactNode;
};

export const WineCard: FC<WineCardProps> = ({ wine, className, children }) => {
  const [open, setOpen] = useState(false);

  const onToggle = () => setOpen((previous) => !previous);

  const wineColor = WINE_TYPES[wine.wineType].color;
  const textColor = fontColorContrast(wineColor);
  const softColor = tinycolor(wineColor).lighten(20).toString();
  const cornerColor = tinycolor(wineColor).darken(20).toString();

  return (
    <WineCardWrapper className={className}>
      <MenuButton
        open={open}
        type="button"
        onClick={onToggle}
        style={{ background: softColor, color: textColor }}
      >
        <MenuIcon />
      </MenuButton>
      <WineCardImageContainer
        open={open}
        href={wine.pictureFileName}
        target="_blank"
      >
        <WineImage
          open={open}
          width={config.PICTURE_UPLOAD.THUMBNAIL.WIDTH}
          height={config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
          src={wine.thumbnailFileName}
          lazyLoader={wine.blur}
        />
      </WineCardImageContainer>
      {open && (
        <WineCardContainer style={{ background: softColor, color: textColor }}>
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
                borderBottomColor: cornerColor,
              }
        }
      />
      <WinePane open={open} style={{ background: wineColor, color: textColor }}>
        {wine.name}
      </WinePane>
    </WineCardWrapper>
  );
};
