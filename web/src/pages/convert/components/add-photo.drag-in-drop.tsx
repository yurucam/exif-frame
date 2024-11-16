import { ChangeEvent } from 'react';
import Photo from '../../../core/photo';
import { useStore } from '../../../store';
import DragInDropIcon from '../../../icons/drag-in-drop.icon';
import { t } from 'i18next';

const AddPhotoDragInDrop = () => {
  const { photos, setPhotos, setLoading, setOpenedAddPhotoErrorDialog, darkMode } = useStore();

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
      <input type="file" accept="image/*" onChange={onChange} onClick={(e) => (e.currentTarget.value = '')} multiple hidden />

      <div
        style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '20rem',
          border: `2px dashed ${darkMode ? '#fff' : '#000'}`,
          borderRadius: '0.5rem',
          margin: '32px',
        }}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onClick={() => {
          const input: HTMLInputElement | null = document.querySelector('input[type="file"]');
          if (input) input.click();
        }}
      >
        <DragInDropIcon size={48} />
        <div
          style={{
            fontSize: '1rem',
            color: darkMode ? '#fff' : '#000',
            marginTop: '1rem',
            width: '80%',
          }}
          className="text-center"
        >
          {t('drag-and-drop-photos-here')}
        </div>
      </div>
    </>
  );
};

export default AddPhotoDragInDrop;
