import { ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import BuildingIcon from '../../../icons/building.icon';

const ShowCameraMakerListItem = () => {
  const { t } = useTranslation();
  const { showCameraMaker, setShowCameraMaker } = useStore();

  return (
    <>
      <ListItem title={t('root.settings.show-camera-maker')} media={<BuildingIcon size={26} />} after={<Toggle checked={showCameraMaker} onChange={() => setShowCameraMaker(!showCameraMaker)} />} />
    </>
  );
};

export default ShowCameraMakerListItem;
