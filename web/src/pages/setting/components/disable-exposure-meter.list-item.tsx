import { ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import MeterIcon from '../../../icons/meter.icon';

const DisableExposureMeterListItem = () => {
  const { t } = useTranslation();
  const { disableExposureMeter, setDisableExposureMeter } = useStore();

  return (
    <ListItem
      title={t('root.settings.disable-exposure-meter')}
      media={<MeterIcon size={26} />}
      after={<Toggle checked={disableExposureMeter} onChange={() => setDisableExposureMeter(!disableExposureMeter)} />}
    />
  );
};

export default DisableExposureMeterListItem;
