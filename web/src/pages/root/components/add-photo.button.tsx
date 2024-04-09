import { ChangeEvent } from 'react';
import { Button } from 'konsta/react';
import Photo from '../../../core/photo';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store';

const AddPhotoButton = () => {
  const { t } = useTranslation();
  const { photos, setPhotos } = useStore();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;
    Promise.all(Array.from(files).map(Photo.create)).then((newPhotos) => {
      setPhotos([...photos, ...newPhotos]);
    });
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={onChange} multiple hidden />

      <Button
        clear
        onClick={() => {
          const input: HTMLInputElement | null = document.querySelector('input[type="file"]');
          if (input) input.click();
        }}
      >
        {t('root.add-photo')}
      </Button>
    </>
  );
};

export default AddPhotoButton;
