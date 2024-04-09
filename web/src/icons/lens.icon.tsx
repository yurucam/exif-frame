import { Icon } from 'konsta/react';
import { SiLens } from 'react-icons/si';

interface LensIconProps {
  size?: number;
}

const LensIcon = ({ size }: LensIconProps) => {
  return <Icon ios={<SiLens size={size} />} />;
};

export default LensIcon;
