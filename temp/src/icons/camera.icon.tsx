import { Icon } from 'konsta/react';
import { IoCameraOutline } from 'react-icons/io5';

interface CameraIconProps {
  size?: number;
}

const CameraIcon = ({ size }: CameraIconProps) => {
  return <Icon ios={<IoCameraOutline size={size} />} />;
};

export default CameraIcon;
