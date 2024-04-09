import { ListItem, Radio } from 'konsta/react';
import { useStore } from '../../../store';

interface ThemeListItemProps {
  name: string;
}

const ThemeListItem = ({ name }: ThemeListItemProps) => {
  const { selectedThemeName, setSelectedThemeName } = useStore();
  return <ListItem label title={name} media={<Radio checked={selectedThemeName === name} onChange={() => setSelectedThemeName(name)} />} />;
};

export default ThemeListItem;
