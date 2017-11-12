// @flow
import React from "react";
import Dropzone from "react-dropzone";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import AddAPhotoIcon from "material-ui-icons/AddAPhoto";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

type UploadProps = {
  classes: {},
  onDrop: Function
};

const Upload = ({ classes, onDrop }: UploadProps) => (
  <div>
    <p>Cliquez sur le bouton pour prendre la photo</p>
    <Dropzone style={{}} onDrop={onDrop} multiple={false} accept="image/*">
      <Button fab color="primary" aria-label="add" className={classes.button}>
        <AddAPhotoIcon />
      </Button>
    </Dropzone>
  </div>
);

export default withStyles(styles)(Upload);
