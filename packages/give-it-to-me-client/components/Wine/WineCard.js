import React from "react";
import Button from "material-ui/Button";
import MenuIcon from "material-ui-icons/Menu";
import classNames from "classnames";
import { withStyles } from "material-ui/styles";
import tinycolor from "tinycolor2";
import fontColorContrast from "font-color-contrast";
import { PICTURE_UPLOAD, wineTypes } from "give-it-to-me-config";

import Image from "../Image/Image";
import { WineType } from "./Wine.type";

const { WINE_TYPES } = wineTypes;
const openInfosHeight = 70;
const closeInfosHeight = 50;
const paddingInfos = 10;

const styles = () => ({
  wineCard: {
    width: `${PICTURE_UPLOAD.THUMBNAIL.WIDTH + 16}px`,
    display: "inline-block",
    position: "relative",
    height: `${PICTURE_UPLOAD.THUMBNAIL.HEIGHT +
      closeInfosHeight +
      2 * paddingInfos}px`,
    margin: "1em"
  },
  wineCardButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 4,
    transition: "transform 0.3s"
  },
  WineCardImageContainer: {
    position: "absolute",
    top: "0px",
    left: "0px",
    right: "0px",
    height: "100%",
    display: "block",
    overflow: "hidden",
    transition: "transform 0.3s"
  },
  wineCardImageContainerOpen: {
    marginLeft: "0px",
    width: "100%",
    height: "100%"
  },
  pictureToAvatar: {
    borderRadius: "50%",
    transform: "scale(0.18, 0.14) translate(-650px, -1350px)",
    zIndex: 4
  },
  wineImage: {
    marginLeft: "16px"
  },
  wineImageOpen: {
    marginLeft: "0px",
    height: "auto",
    width: "100%"
  },
  wineCorner: {
    position: "absolute",
    border: "8px solid",
    transition: "transform 0.3s",
    borderLeftColor: "transparent",
    borderTopColor: "transparent",
    bottom: "auto",
    top: `${PICTURE_UPLOAD.THUMBNAIL.HEIGHT - 16}px`
  },
  wineCornerOpen: {
    borderBottomColor: "transparent",
    transform: "translate(0px, -294px)"
  },
  winePane: {
    position: "absolute",
    right: "0px",
    left: "0px",
    padding: `${paddingInfos}px 16px`,
    paddingLeft: `${paddingInfos}px`,
    transition: "transform 0.3s",
    height: `${closeInfosHeight}px`,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    top: `${PICTURE_UPLOAD.THUMBNAIL.HEIGHT}px`
  },
  winePaneOpen: {
    transform: `translate(0px, -${PICTURE_UPLOAD.THUMBNAIL.HEIGHT}px)`,
    height: `${openInfosHeight}px`,
    paddingLeft: "80px",
    paddingRight: "80px"
  },
  wineCardContainer: {
    position: "absolute",
    top: `${openInfosHeight + 2 * paddingInfos}px`,
    padding: "10px",
    left: "16px",
    bottom: "0px",
    display: "block",
    zIndex: 2,
    right: "0px"
  }
});

type WineCardProps = {
  wine: WineType,
  classes: {},
  children: Function
};

class WineCard extends React.Component<WineCardProps> {
  state = {
    open: false
  };

  onToggle = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  render() {
    const { wine = {}, classes, children } = this.props;
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
      <div className={classes.wineCard}>
        <Button
          onClick={this.onToggle}
          style={{
            background: softColor,
            color: textColor
          }}
          fab
          color="primary"
          aria-label="add"
          className={classes.wineCardButton}
        >
          <MenuIcon />
        </Button>
        <div
          className={classNames(classes.WineCardImageContainer, {
            [classes.wineCardImageContainerOpen]: open,
            [classes.pictureToAvatar]: open
          })}
        >
          <Image
            className={classNames(classes.wineImage, {
              [classes.wineImageOpen]: open
            })}
            width={PICTURE_UPLOAD.THUMBNAIL.WIDTH}
            height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
            src={wine.thumbnailFileName}
            lazyLoader={wine.blur}
          />
        </div>
        {open && (
          <div
            className={classes.wineCardContainer}
            style={{ background: softColor, color: textColor }}
          >
            {children(wine)}
          </div>
        )}
        <div
          style={
            open
              ? {
                  borderRightColor: cornerColor,
                  borderTopColor: cornerColor
                }
              : {
                  borderRightColor: cornerColor,
                  borderBottomColor: cornerColor
                }
          }
          className={classNames(classes.wineCorner, {
            [classes.wineCornerOpen]: open
          })}
        />
        <div
          className={classNames(classes.winePane, {
            [classes.winePaneOpen]: open
          })}
          style={{ background: wineColor, color: textColor }}
        >
          {wine.name}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WineCard);

// const wineColor = WINE_TYPES[wine.wineType];
// const cornerColor = tinycolor(wineColor.color)
//   .darken(20)
//   .toString();
// const wineCardInfos = {
//   ...wineCardStyle.wineCardInfos,
//   background: wineColor.color
// };
// const wineCardInfosCorner = {
//   ...wineCardStyle.wineCardInfosCorner,
//   borderRightColor: cornerColor,
//   borderBottomColor: cornerColor
// };
// const wineCardWineCardainer = {
//   ...wineCardStyle.wineCardWineCardainer
// };
// const wineCardMenuButton = {
//   ...wineCardStyle.wineCardMenuButton
// };
// const wineCardImage = {
//   ...wineCardStyle.wineCardImage
// };

// if (open) {
//   Object.assign(wineCardInfos, wineCardStyle.wineCardInfosOpen);
//   Object.assign(
//     wineCardInfosCorner,
//     wineCardStyle.wineCardInfosCornerOpen,
//     { borderTopColor: cornerColor }
//   );
//   Object.assign(wineCardImageContainer, wineCardStyle.pictureToAvatar);
//   Object.assign(wineCardMenuButton, wineCardStyle.wineCardMenuButtonOpen);
//   Object.assign(wineCardImage, wineCardStyle.wineCardImageOpen);
// }
