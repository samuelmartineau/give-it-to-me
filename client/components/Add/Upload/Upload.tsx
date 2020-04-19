import React from 'react';
import Dropzone from 'react-dropzone';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { Button } from '~/client/components/Toolkit';

type UploadProps = {
  onDrop: Function;
};

export const Upload = ({ onDrop }: UploadProps) => (
  <div>
    <p>Cliquez sur le bouton pour prendre la photo</p>
    <Dropzone onDrop={onDrop} accept="image/*" multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input tabIndex="-1" {...getInputProps()} accept="image/*" />
          <Button type="button">
            <AddAPhotoIcon />
          </Button>
        </div>
      )}
    </Dropzone>
  </div>
);
