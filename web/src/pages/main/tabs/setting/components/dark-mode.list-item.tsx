import { ListItem, Toggle } from 'konsta/react';
import { CgDarkMode } from 'react-icons/cg';
import { useSettingStore } from '../../../state/setting.store';
import { useTranslation } from 'react-i18next';

const DarkModeListItem = () => {
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useSettingStore();
  return <ListItem media={<CgDarkMode size={26} />} title={t('dark-mode')} after={<Toggle checked={darkMode} onChange={() => toggleDarkMode()} />} />;
};

export default DarkModeListItem;
