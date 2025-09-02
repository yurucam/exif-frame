import { ListItem, Toggle } from 'konsta/react';
import { FaRegImage } from 'react-icons/fa';
import { useSettingStore } from '../../../state/setting.store';
import { useTranslation } from 'react-i18next';

const WebpModeListItem = () => {
  const { t } = useTranslation();
  const { webpMode, toggleWebpMode } = useSettingStore();
  return <ListItem media={<FaRegImage size={26} />} title={t('webp-mode')} after={<Toggle checked={webpMode} onChange={() => toggleWebpMode()} />} />;
};

export default WebpModeListItem;
