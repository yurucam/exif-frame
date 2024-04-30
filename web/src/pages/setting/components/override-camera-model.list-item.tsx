import { ListInput } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import CameraIcon from '../../../icons/camera.icon';

const OverrideCameraModelListItem = () => {
  const { t } = useTranslation();
  const { showCameraModel, overrideCameraModel, setOverrideCameraModel } = useStore();

  if (!showCameraModel) return null;

  return (
    <>
      <ListInput
        floatingLabel
        label={t('root.settings.override-camera-model')}
        media={<CameraIcon size={26} />}
        type="text"
        value={overrideCameraModel}
        onChange={(e) => setOverrideCameraModel(e.target.value)}
      />
    </>
  );
};

export default OverrideCameraModelListItem;
