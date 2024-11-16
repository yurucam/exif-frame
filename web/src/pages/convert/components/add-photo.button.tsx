import { ChangeEvent } from 'react';
import { Button } from 'konsta/react';
import Photo from '../../../core/photo';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store';
import AddIcon from '../../../icons/add.icon';

const AddPhotoButton = () => {
  const { t } = useTranslation();
  const { photos, setPhotos, setLoading, setOpenedAddPhotoErrorDialog } = useStore();

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    if (!files) return;
    try {
      await Promise.all(Array.from(files).map(Photo.create)).then((newPhotos) => {
        setPhotos([...photos, ...newPhotos]);
      });
    } catch (e) {
      console.error(e);
      setOpenedAddPhotoErrorDialog(true);
    }
    setLoading(false);
  };

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const { files } = event.target;
    if (!files) return;
    try {
      await Promise.all(Array.from(files).map(Photo.create)).then((newPhotos) => {
        setPhotos([...photos, ...newPhotos]);
      });
    } catch (e) {
      console.error(e);
      setOpenedAddPhotoErrorDialog(true);
    }
    setLoading(false);
  };

  return (
    <>
      <input type="file" accept="image/jpeg" onChange={onChange} onClick={(e) => (e.currentTarget.value = '')} multiple hidden />

      <Button
        clear
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => {
          const input: HTMLInputElement | null = document.querySelector('input[type="file"]');
          if (input) input.click();
        }}
      >
        <AddIcon size={18} />
        <div style={{ width: 4 }} />
        {t('root.add-photo')}
      </Button>
    </>
  );
};

export default AddPhotoButton;
