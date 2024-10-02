import { Icon } from 'konsta/react';
import { CgDarkMode } from 'react-icons/cg';

interface DarkModeIconProps {
  size?: number;
}

const DarkModeIcon = ({ size }: DarkModeIconProps) => {
  return <Icon ios={<CgDarkMode size={size} />} />;
};

export default DarkModeIcon;
