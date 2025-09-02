import { ListItem, Toggle } from 'konsta/react';
import { CgDarkMode } from 'react-icons/cg';
import { useSettingStore } from '../../../state/setting.store';

const DarkModeListItem = () => {
  const { darkMode, toggleDarkMode } = useSettingStore();

  return <ListItem media={<CgDarkMode size={26} />} title={'Dark mode'} after={<Toggle checked={darkMode} onChange={() => toggleDarkMode()} />} />;
};

export default DarkModeListItem;
