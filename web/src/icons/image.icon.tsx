import { Icon } from 'konsta/react';
import { IoImagesOutline } from 'react-icons/io5';

interface IconProps {
  size?: number;
}

const ImageIcon = ({ size }: IconProps) => {
  return <Icon ios={<IoImagesOutline size={size} />} />;
};

export default ImageIcon;
