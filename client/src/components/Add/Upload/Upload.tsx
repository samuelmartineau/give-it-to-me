import React, { FC } from 'react';
import { useDropzone, DropEvent, FileRejection } from 'react-dropzone';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button } from '@/components/Toolkit';

type Props = {
  onDrop: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void;
};

export const Upload: FC<Props> = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  return (
    <div>
      <p>Cliquez sur le bouton pour prendre la photo</p>
      <div {...getRootProps()}>
        <input {...getInputProps()} name="picture" />
        <Button type="button">
          <AddAPhotoIcon />
        </Button>
      </div>
    </div>
  );
};
