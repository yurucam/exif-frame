import { Icon } from 'konsta/react';
import { LuThermometerSun } from 'react-icons/lu';

interface MeterIconProps {
  size?: number;
}

const MeterIcon = ({ size }: MeterIconProps) => {
  return <Icon ios={<LuThermometerSun size={size} />} />;
};

export default MeterIcon;
