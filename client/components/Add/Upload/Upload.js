// @flow
import React from 'react';
import Dropzone from 'react-dropzone';
import { Button } from '~/client/components/Toolkit';

type UploadProps = {
  classes: {},
  onDrop: Function
};

export const Upload = ({ onDrop }: UploadProps) => (
  <div>
    <p>Cliquez sur le bouton pour prendre la photo</p>
    <Dropzone style={{}} onDrop={onDrop} multiple={false} accept="image/*">
      <Button>
        <i className="material-icons">add_a_photo</i>
      </Button>
    </Dropzone>
  </div>
);
