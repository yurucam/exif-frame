import { ListInput } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import BuildingIcon from '../../../icons/building.icon';

const OverrideCameraMakerListItem = () => {
  const { t } = useTranslation();
  const { showCameraMaker, overrideCameraMaker, setOverrideCameraMaker } = useStore();

  if (!showCameraMaker) return null;

  return (
    <>
      <ListInput
        floatingLabel
        label={t('root.settings.override-camera-maker')}
        media={<BuildingIcon size={26} />}
        type="text"
        value={overrideCameraMaker}
        onChange={(e) => setOverrideCameraMaker(e.target.value)}
      />
    </>
  );
};

export default OverrideCameraMakerListItem;
