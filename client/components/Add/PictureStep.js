// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Upload } from './Upload/Upload';
import { uploadWinePicture } from '../../api';
import { PICTURE_UPLOAD, buildAssetsUrl } from '~/config';
import { Image } from '../Image/Image';
import { Button, Spinner } from '~/client/components/Toolkit';
import styled from 'styled-components';
import { updateModel } from '~/client/store/';

type Props = {
  onUpload: Function,
  onReset: Function,
  thumbnailFileName: string,
  blur: string
};

type State = {
  isUploading: boolean
};

const Wrapper = styled.div`
  text-align: center;
`;

export class PictureStep extends React.Component<Props, State> {
  state = { isUploading: false };
  onDrop = async (files: Array<string>) => {
    const winePicture = files[0];
    this.setState({ isUploading: true });
    try {
      const result = await uploadWinePicture(winePicture);
      this.props.onUpload(result);
      this.setState({
        isUploading: false
      });
    } catch (error) {
      this.setState({ isUploading: false });
      throw error;
    }
  };

  resetUpload = () => {
    this.props.onReset();
    this.setState({ isUploading: false });
  };

  render() {
    const { isUploading } = this.state;
    const { thumbnailFileName, blur } = this.props;
    let render;

    if (blur) {
      render = (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Image
            width={PICTURE_UPLOAD.THUMBNAIL.WIDTH}
            height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
            src={buildAssetsUrl(thumbnailFileName)}
            lazyLoader={blur}
            delay={1000}
          />
          <Button onClick={this.resetUpload}>
            Changer de photo
            <i className="material-icons">delete</i>
          </Button>
        </div>
      );
    } else if (isUploading) {
      render = <Spinner />;
    } else {
      render = <Upload onDrop={this.onDrop} />;
    }

    return <Wrapper>{render}</Wrapper>;
  }
}

export const PictureStepConnected = connect(
  state => ({
    thumbnailFileName: state.adding.model.thumbnailFileName,
    blur: state.adding.model.blur
  }),
  dispatch => ({
    onUpload({ thumbnailFileName, pictureFileName, blur }) {
      dispatch(updateModel('thumbnailFileName', thumbnailFileName));
      dispatch(updateModel('pictureFileName', pictureFileName));
      dispatch(updateModel('blur', blur));
    },
    onReset() {
      dispatch(updateModel('thumbnailFileName', ''));
      dispatch(updateModel('pictureFileName', ''));
      dispatch(updateModel('blur', ''));
    }
  })
)(PictureStep);
