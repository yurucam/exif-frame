import { Icon } from 'konsta/react';
import { SiJpeg } from 'react-icons/si';

interface JpegIconProps {
  size?: number;
}

const JpegIcon = ({ size }: JpegIconProps) => {
  return <Icon ios={<SiJpeg size={size} />} />;
};

export default JpegIcon;
