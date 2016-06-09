import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentPhoto from 'material-ui/svg-icons/image/add-a-photo';

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
        const {isUploaded, isUploading, blur, thumbnailFileName} = this.props.upload;
        let render;

        if (isUploaded) {
            render = <Image
                        width={PICTURE_UPLOAD.THUMBNAIL.WIDTH}
                        height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
                        src={thumbnailFileName}
                        lazyLoader={blur}
                    />
        } else if (isUploading) {
            render = <CircularProgress />
        } else {
            render = <Dropzone
                style={{}}
                onDrop={::this.onDrop}
                multiple={false}
                accept="image/*">
                    <FloatingActionButton >
                      <ContentPhoto />
                    </FloatingActionButton>
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
