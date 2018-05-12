import React from 'react';
import { Spinner } from '../Layout/Spinner';
import { Upload } from './Upload/Upload';
import { uploadWinePicture } from '../../api';
import { PICTURE_UPLOAD, API_URL } from '~/config';
import { Image } from '../Image/Image';
import { Button } from '~/client/components/Toolkit';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

export class PictureStep extends React.Component {
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
    let render;

    if (isUploaded) {
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
            src={`${API_URL}/${result.thumbnailFileName}`}
            lazyLoader={result.blur}
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
