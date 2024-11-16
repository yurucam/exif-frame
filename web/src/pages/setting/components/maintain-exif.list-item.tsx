import { ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import DatabaseIcon from '../../../icons/database.icon';

const MaintainExifListItem = () => {
  const { t } = useTranslation();
  const { maintainExif, setMaintainExif } = useStore();

  return (
    <>
      <ListItem title={t('root.settings.maintain-exif')} media={<DatabaseIcon size={26} />} after={<Toggle checked={maintainExif} onChange={() => setMaintainExif(!maintainExif)} />} />
    </>
  );
};

export default MaintainExifListItem;
