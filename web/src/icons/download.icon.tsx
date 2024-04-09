import { Icon } from 'konsta/react';
import { IoDownloadOutline } from 'react-icons/io5';

interface DownloadIconProps {
  size?: number;
}

const DownloadIcon = ({ size }: DownloadIconProps) => {
  return <Icon ios={<IoDownloadOutline size={size} />} />;
};

export default DownloadIcon;
