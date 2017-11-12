import React from "react";
import Spinner from "../Layout/Spinner";
import Button from "material-ui/Button";
import Delete from "material-ui-icons/Delete";
import { withStyles } from "material-ui/styles";
import Upload from "./Upload";
import { uploadWinePicture } from "../../api";
import { PICTURE_UPLOAD, API_URL } from "give-it-to-me-config";
import Image from "../Image/Image";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class PictureStep extends React.Component {
  state = {
    isUploaded: false,
    isUploading: false
  };
  onDrop = async files => {
    const winePicture = files[0];
    this.setState({ isUploading: true });
    try {
      const result = await uploadWinePicture(winePicture);
      this.setState({
        isUploading: false,
        isUploaded: true,
        result
      });
    } catch (error) {
      this.setState({ isUploaded: false, isUploading: false });
    }
  };

  resetUpload = () => {
    this.setState({
      isUploading: false,
      isUploaded: false
    });
  };

  render() {
    const { isUploaded, isUploading, result } = this.state;
    const { classes } = this.props;
    let render;

    if (isUploaded) {
      render = (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Image
            width={PICTURE_UPLOAD.THUMBNAIL.WIDTH}
            height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
            src={`${API_URL}/${result.thumbnailFileName}`}
            lazyLoader={result.blur}
            delay={1000}
          />
          <Button
            onClick={this.resetUpload}
            className={classes.button}
            raised
            color="accent"
          >
            Changer de photo
            <Delete className={classes.rightIcon} />
          </Button>
        </div>
      );
    } else if (isUploading) {
      render = <Spinner />;
    } else {
      render = <Upload onDrop={this.onDrop} />;
    }

    return <div style={{ textAlign: "center" }}>{render}</div>;
  }
}

export default withStyles(styles)(PictureStep);
