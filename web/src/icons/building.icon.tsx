import { Icon } from 'konsta/react';
import { PiBuildings } from 'react-icons/pi';

interface BuildingIconProps {
  size?: number;
}

const BuildingIcon = ({ size }: BuildingIconProps) => {
  return <Icon ios={<PiBuildings size={size} />} />;
};

export default BuildingIcon;
