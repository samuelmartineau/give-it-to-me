import React from "react";
import Button from "material-ui/Button";
import MenuIcon from "material-ui-icons/Menu";
import { withStyles } from "material-ui/styles";
import tinycolor from "tinycolor2";

import { PICTURE_UPLOAD, wineTypes } from "give-it-to-me-config";
import Image from "../Image/Image";

const { WINE_TYPES } = wineTypes;
const openInfosHeight = 70;
const closeInfosHeight = 50;
const paddingInfos = 10;
const styles = theme => ({
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
    top: "16px",
    right: "16px",
    zIndex: 4
  },
  imageContainer: {
    position: "absolute",
    top: "0px",
    left: "0px",
    right: "0px",
    height: "100%",
    display: "block",
    overflow: "hidden",
    transition: "transform 0.3s"
  },
  wineImage: {
    marginLeft: "16px"
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
  }
});

class WineCard extends React.Component {
  state = {
    open: false
  };

  onToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { wine = {}, classes } = this.props;
    const { open } = this.state;
    const wineColor = WINE_TYPES[wine.wineType];
    const cornerColor = tinycolor(wineColor.color)
      .darken(20)
      .toString();

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
    // const wineCardImageContainer = {
    //   ...wineCardStyle.wineCardImageContainer
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

    return (
      <div className={classes.wineCard}>
        <Button
          style={{ background: wineColor.color }}
          fab
          color="primary"
          aria-label="add"
          className={classes.wineCardButton}
        >
          <MenuIcon />
        </Button>
        <div className={classes.imageContainer}>
          <Image
            className={classes.wineImage}
            width={PICTURE_UPLOAD.THUMBNAIL.WIDTH}
            height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
            src={wine.thumbnailFileName}
            lazyLoader={wine.blur}
          />
        </div>
        <div
          style={{
            borderRightColor: cornerColor,
            borderBottomColor: cornerColor
          }}
          className={classes.wineCorner}
        />
        <div
          className={classes.winePane}
          style={{ background: wineColor.color }}
        >
          {wine.name}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WineCard);
