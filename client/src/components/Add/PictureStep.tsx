import React, { FC, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { Upload } from './Upload/Upload';
import { uploadWinePicture } from '../../api';
import config from '~/config';
import { Image } from '../Image/Image';
import { Button, Spinner } from '@/components/Toolkit';
import styled from 'styled-components';
import { updateModel, RootState } from '@/store/';

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

  const onDrop = async (acceptedFiles: File[]) => {
    const winePicture = acceptedFiles[0];
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

  if (blur && thumbnailFileName) {
    render = (
      <BlurWrapper data-e2e="picture">
        <Image
          width={config.PICTURE_UPLOAD.THUMBNAIL.WIDTH}
          height={config.PICTURE_UPLOAD.THUMBNAIL.HEIGHT}
          src={thumbnailFileName}
          lazyLoader={blur}
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
    onUpload({
      thumbnailFileName,
      pictureFileName,
      blur,
    }: {
      thumbnailFileName: string;
      pictureFileName: string;
      blur: string;
    }) {
      dispatch(
        updateModel({ name: 'thumbnailFileName', value: thumbnailFileName }),
      );
      dispatch(
        updateModel({ name: 'pictureFileName', value: pictureFileName }),
      );
      dispatch(updateModel({ name: 'blur', value: blur }));
    },
    onReset() {
      dispatch(updateModel({ name: 'thumbnailFileName', value: '' }));
      dispatch(updateModel({ name: 'pictureFileName', value: '' }));
      dispatch(updateModel({ name: 'blur', value: '' }));
    },
  }),
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export const PictureStepConnected = connector(PictureStep);
