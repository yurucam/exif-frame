import { ChangeEvent } from 'react';
import { Button, Icon } from 'konsta/react';
import { IoAddOutline } from 'react-icons/io5';
import Photo from '../domain/photo';

interface PhotoUploadButtonProps {
  onPhotoAdded: (photos: Photo[]) => void;
}

const PhotoUploadButton = (props: PhotoUploadButtonProps) => {
  const { onPhotoAdded } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;
    Promise.all(Array.from(files).map(Photo.create)).then(onPhotoAdded);
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={onChange} multiple hidden />

      <Button
        clear
        large
        onClick={() => {
          const input: HTMLInputElement | null = document.querySelector('input[type="file"]');
          if (input) input.click();
        }}
      >
        <Icon ios={<IoAddOutline className="w-7 h-5" />} /> ADD IMAGE
      </Button>
    </>
  );
};

export default PhotoUploadButton;
