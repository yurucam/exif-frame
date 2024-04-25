import { ListItem, Radio } from 'konsta/react';
import { useStore } from '../store';
import { changeThemeEvent } from '../google-analytics';
import { useThemeStore } from '../themes';

interface ThemeListItemProps {
  name: string;
}

const ThemeListItem = ({ name }: ThemeListItemProps) => {
  const { selectedThemeName, setSelectedThemeName } = useStore();
  const { clearOption } = useThemeStore();

  return (
    <ListItem
      label
      title={name}
      media={
        <Radio
          checked={selectedThemeName === name}
          onChange={() => {
            changeThemeEvent(name);
            clearOption();
            setSelectedThemeName(name);
          }}
        />
      }
    />
  );
};

export default ThemeListItem;
