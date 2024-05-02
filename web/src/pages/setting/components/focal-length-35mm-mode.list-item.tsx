import { ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import CameraIcon from '../../../icons/camera.icon';

const FocalLength35mmModeListItem = () => {
  const { t } = useTranslation();
  const { focalLengthRatioMode, focalLength35mmMode, setFocalLength35mmMode } = useStore();

  if (focalLengthRatioMode) return null;

  return (
    <ListItem
      title={t('root.settings.focal-length-35mm-mode')}
      media={<CameraIcon size={26} />}
      after={<Toggle checked={focalLength35mmMode} onChange={() => setFocalLength35mmMode(!focalLength35mmMode)} />}
    />
  );
};

export default FocalLength35mmModeListItem;
