import { ChangeEvent } from 'react';
import { Button } from 'konsta/react';
import Photo from '../../../core/photo';
// import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store';
import CameraIcon from '../../../icons/camera.icon';

const CapturePhotoButton = () => {
  // const { t } = useTranslation();
  const { photos, setPhotos, setLoading, setOpenedAddPhotoErrorDialog } = useStore();

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const { files } = event.target;
    if (!files) {
      setLoading(false);
      return;
    }
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
      <input type="file" accept="image/*" capture="environment" onChange={onChange} onClick={(e) => (e.currentTarget.value = '')} hidden />

      <Button
        clear
        onClick={() => {
          const inputs = document.querySelectorAll('input[type="file"]');
          const input = Array.from(inputs).find((i) => i.hasAttribute('capture')) as HTMLInputElement;
          if (input) input.click();
        }}
      >
        <CameraIcon size={18} />
        <div style={{ width: 4 }} />
        Capture
      </Button>
    </>
  );
};

export default CapturePhotoButton;
