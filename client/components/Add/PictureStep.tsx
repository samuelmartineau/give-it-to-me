import React, { FC, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { Upload } from './Upload/Upload';
import { uploadWinePicture } from '../../api';
import { PICTURE_UPLOAD } from '~/config';
import { Image } from '../Image/Image';
import { Button, Spinner } from '~/client/components/Toolkit';
import styled from 'styled-components';
import { updateModel, RootState } from '~/client/store/';

const Wrapper = styled.div`
  text-align: center;
`;
const BlurWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonStyled = styled(Button)`
  margin: 1rem;
`;

type Props = PropsFromRedux;

export const PictureStep: FC<Props> = ({
  onUpload,
  thumbnailFileName,
  blur,
  onReset,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (files: Array<string>) => {
    const winePicture = files[0];
    setIsUploading(true);
    try {
      const result = await uploadWinePicture(winePicture);
      onUpload(result);
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
      throw error;
    }
  };

  const resetUpload = () => {
    onReset();
  };

  let render;

  if (blur) {
    render = (
      <BlurWrapper>
        <Image
          width={PICTURE_UPLOAD.THUMBNAIL.WIDTH}
          height={PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
          src={thumbnailFileName}
          lazyLoader={blur}
          delay={1000}
        />
        <ButtonStyled type="button" onClick={resetUpload}>
          Changer de photo
          <DeleteIcon />
        </ButtonStyled>
      </BlurWrapper>
    );
  } else if (isUploading) {
    render = <Spinner />;
  } else {
    render = <Upload onDrop={onDrop} />;
  }
  return <Wrapper>{render}</Wrapper>;
};

const connector = connect(
  (state: RootState) => ({
    thumbnailFileName: state.adding.model.thumbnailFileName,
    blur: state.adding.model.blur,
  }),
  (dispatch) => ({
    onUpload({ thumbnailFileName, pictureFileName, blur }) {
      dispatch(updateModel('thumbnailFileName', thumbnailFileName));
      dispatch(updateModel('pictureFileName', pictureFileName));
      dispatch(updateModel('blur', blur));
    },
    onReset() {
      dispatch(updateModel('thumbnailFileName', ''));
      dispatch(updateModel('pictureFileName', ''));
      dispatch(updateModel('blur', ''));
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const PictureStepConnected = connector(PictureStep);
