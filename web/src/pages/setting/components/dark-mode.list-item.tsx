import { ListItem, Toggle } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import DarkModeIcon from '../../../icons/dark-mode.icon';

const DarkModeListItem = () => {
  const { t } = useTranslation();
  const { darkMode, setDarkMode } = useStore();

  return <ListItem media={<DarkModeIcon size={26} />} title={t('root.settings.dark-mode')} after={<Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />} />;
};

export default DarkModeListItem;
