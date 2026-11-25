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
    <div {...getRootProps()}>
      <input {...getInputProps()} name="picture" />
      <Button type="button" style={{ minHeight: 64, fontSize: '1.2rem' }}>
        <AddAPhotoIcon />
        Prendre une photo
      </Button>
    </div>
  );
};
