import { ListItem, Toggle } from 'konsta/react';
import { FaRegImage } from 'react-icons/fa';
import { useSettingStore } from '../../../state/setting.store';

const WebpModeListItem = () => {
  const { webpMode, toggleWebpMode } = useSettingStore();

  return <ListItem media={<FaRegImage size={26} />} title={'Webp mode'} after={<Toggle checked={webpMode} onChange={() => toggleWebpMode()} />} />;
};

export default WebpModeListItem;
