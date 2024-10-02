import { Icon } from 'konsta/react';
import { GoLaw } from 'react-icons/go';

interface LawIconProps {
  size?: number;
}

const LawIcon = ({ size }: LawIconProps) => {
  return <Icon ios={<GoLaw size={size} />} />;
};

export default LawIcon;
