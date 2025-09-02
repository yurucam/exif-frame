import { ListItem, Toggle } from 'konsta/react';
import { LuDatabaseZap } from 'react-icons/lu';
import { useSettingStore } from '../../../state/setting.store';
import { useTranslation } from 'react-i18next';

const MaintainExifMetadataListItem = () => {
  const { t } = useTranslation();
  const { maintainExifMetadata, toggleMaintainExifMetadata } = useSettingStore();
  return <ListItem media={<LuDatabaseZap size={26} />} title={t('maintain-exif-metadata')} after={<Toggle checked={maintainExifMetadata} onChange={() => toggleMaintainExifMetadata()} />} />;
};

export default MaintainExifMetadataListItem;
