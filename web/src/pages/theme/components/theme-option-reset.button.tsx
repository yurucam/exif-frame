import { Button, Icon } from 'konsta/react';
import { GrPowerReset } from 'react-icons/gr';
import { useStore } from '../../../store';
import themes from '../../../themes';
import Customize from '../database/customize';

const ThemeOptionResetButton = () => {
  const { selectedThemeName, setRerenderOptions } = useStore();
  const theme = themes.find((theme) => theme.name === selectedThemeName);

  return (
    <div className="w-10">
      <Button
        className="k-color-brand-green"
        onClick={() => {
          theme?.options.forEach((option) => Customize.delete(selectedThemeName, option.id));
          setRerenderOptions();
        }}
      >
        <Icon ios={<GrPowerReset className="w-5 h-5" />} />
      </Button>
    </div>
  );
};

export default ThemeOptionResetButton;
