import { ListItem, Toggle } from 'konsta/react';
import { LuDatabaseZap } from 'react-icons/lu';
import { useSettingStore } from '../../../state/setting.store';

const MaintainExifMetadataListItem = () => {
  const { maintainExifMetadata, toggleMaintainExifMetadata } = useSettingStore();

  return <ListItem media={<LuDatabaseZap size={26} />} title={'Maintain exif metadata'} after={<Toggle checked={maintainExifMetadata} onChange={() => toggleMaintainExifMetadata()} />} />;
};

export default MaintainExifMetadataListItem;
