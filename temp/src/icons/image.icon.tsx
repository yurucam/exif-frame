import { Icon } from 'konsta/react';
import { IoImagesOutline } from 'react-icons/io5';

interface ImageIconProps {
  size?: number;
}

const ImageIcon = ({ size }: ImageIconProps) => {
  return <Icon ios={<IoImagesOutline size={size} />} />;
};

export default ImageIcon;
