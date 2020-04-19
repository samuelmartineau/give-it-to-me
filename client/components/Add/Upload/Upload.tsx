import React, { FC } from 'react';
import Dropzone, { DropEvent } from 'react-dropzone';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { Button } from '~/client/components/Toolkit';

type Props = {
  onDrop: <T extends File>(
    acceptedFiles: T[],
    rejectedFiles: T[],
    event: DropEvent
  ) => void;
};

export const Upload: FC<Props> = ({ onDrop }) => (
  <div>
    <p>Cliquez sur le bouton pour prendre la photo</p>
    <Dropzone onDrop={onDrop} accept="image/*" multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input tabIndex={-1} {...getInputProps()} accept="image/*" />
          <Button type="button">
            <AddAPhotoIcon />
          </Button>
        </div>
      )}
    </Dropzone>
  </div>
);
