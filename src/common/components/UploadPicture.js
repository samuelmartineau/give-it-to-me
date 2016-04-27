import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';

import {uploadWinePicture} from '../actions';

export default class UploadPicture extends Component {
    onDrop(files) {
        const { dispatch } = this.props;
        const winePicture = files[0];
        dispatch(uploadWinePicture(winePicture));
    }

    render() {
      return (
          <Dropzone onDrop={::this.onDrop} multiple={false} accept="image/*">
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
      );
    }
}

UploadPicture.propTypes = { dispatch: PropTypes.func.isRequired };
