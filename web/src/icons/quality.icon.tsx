import { Icon } from 'konsta/react';
import { MdOutlineHighQuality } from 'react-icons/md';

interface QualityIconProps {
  size?: number;
}

const QualityIcon = ({ size }: QualityIconProps) => {
  return <Icon ios={<MdOutlineHighQuality size={size} />} />;
};

export default QualityIcon;
