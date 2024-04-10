import { Icon } from 'konsta/react';
import { IoEyeOutline } from 'react-icons/io5';

interface EyeIconProps {
  size?: number;
}

const EyeIcon = ({ size }: EyeIconProps) => {
  return <Icon ios={<IoEyeOutline size={size} />} />;
};

export default EyeIcon;
