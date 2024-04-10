import { ListItem, Radio } from 'konsta/react';
import { useStore } from '../../../store';
import { changeThemeEvent } from '../../../google-analytics';

interface ThemeListItemProps {
  name: string;
}

const ThemeListItem = ({ name }: ThemeListItemProps) => {
  const { selectedThemeName, setSelectedThemeName } = useStore();
  return (
    <ListItem
      label
      title={name}
      media={
        <Radio
          checked={selectedThemeName === name}
          onChange={() => {
            changeThemeEvent(name);
            setSelectedThemeName(name);
          }}
        />
      }
    />
  );
};

export default ThemeListItem;
