import { Icon } from 'konsta/react';
import { IoSettingsOutline } from 'react-icons/io5';

interface SettingsIconProps {
  size?: number;
}

const SettingsIcon = ({ size }: SettingsIconProps) => {
  return <Icon ios={<IoSettingsOutline size={size} />} />;
};

export default SettingsIcon;
