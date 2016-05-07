import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';

import {uploadWinePicture} from '../actions';
import {PICTURE_UPLOAD} from '../constants/server';
import Image from '../components/Image';

export default class UploadPicture extends Component {
    onDrop(files) {
        const { dispatch } = this.props;
        const winePicture = files[0];
        dispatch(uploadWinePicture(winePicture));
    }

    render() {
        const {isUploaded, isUploading, blur, tmpThumbnail} = this.props.upload;
        let render;

        if (isUploaded) {
            render = <Image
                        width={PICTURE_UPLOAD.THUMBNAIL.WIDTH}
                        height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
                        src={tmpThumbnail}
                        lazyLoader={blur}
                    />
        } else if (isUploading) {
            render = <CircularProgress />
        } else {
            render = <Dropzone onDrop={::this.onDrop} multiple={false} accept="image/*">
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
        }

        return (
            <div>
                {render}
            </div>
        );
    }
}

UploadPicture.propTypes = {
    dispatch: PropTypes.func.isRequired,
    upload: PropTypes.object.isRequired
};
