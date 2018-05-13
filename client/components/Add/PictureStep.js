// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Upload } from './Upload/Upload';
import { uploadWinePicture } from '../../api';
import { PICTURE_UPLOAD, API_URL } from '~/config';
import { Image } from '../Image/Image';
import { Button, Spinner } from '~/client/components/Toolkit';
import styled from 'styled-components';
import { updateModel } from '~/client/store/';

type Props = {
  onUpload: Function,
  onReset: Function
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
      console.log(error);
      this.setState({ isUploading: false });
    }
  };

  resetUpload = () => {
    this.props.onReset();
    this.setState({ isUploading: false });
  };

  render() {
    const { isUploading } = this.state;
    const { thumbnailFileName, blur } = this.props.model;
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
            src={`${API_URL}/${thumbnailFileName}`}
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
  state => ({ model: state.adding.model }),
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
