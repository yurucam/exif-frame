import { Icon } from 'konsta/react';
import { ImLab } from 'react-icons/im';

interface LabIconProps {
  size?: number;
}

const LabIcon = ({ size }: LabIconProps) => {
  return <Icon ios={<ImLab size={size} />} />;
};

export default LabIcon;
