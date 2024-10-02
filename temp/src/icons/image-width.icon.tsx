import { Icon } from 'konsta/react';
import { TbArrowAutofitWidth } from 'react-icons/tb';

interface ImageWidthIconProps {
  size?: number;
}

const ImageWidthIcon = ({ size }: ImageWidthIconProps) => {
  return <Icon ios={<TbArrowAutofitWidth size={size} />} />;
};

export default ImageWidthIcon;
