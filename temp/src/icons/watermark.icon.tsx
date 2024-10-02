import { Icon } from 'konsta/react';
import { MdOutlineBrandingWatermark } from 'react-icons/md';

interface WatermarkIconProps {
  size?: number;
}

const WatermarkIcon = ({ size }: WatermarkIconProps) => {
  return <Icon ios={<MdOutlineBrandingWatermark size={size} />} />;
};

export default WatermarkIcon;
