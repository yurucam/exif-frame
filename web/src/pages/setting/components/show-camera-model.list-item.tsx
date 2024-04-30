import { ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import CameraIcon from '../../../icons/camera.icon';

const ShowCameraModelListItem = () => {
  const { t } = useTranslation();
  const { showCameraModel, setShowCameraModel } = useStore();

  return (
    <>
      <ListItem title={t('root.settings.show-camera-model')} media={<CameraIcon size={26} />} after={<Toggle checked={showCameraModel} onChange={() => setShowCameraModel(!showCameraModel)} />} />
    </>
  );
};

export default ShowCameraModelListItem;
