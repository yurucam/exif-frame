import { Icon } from 'konsta/react';
import { IoMdTime } from 'react-icons/io';

interface TimeIconProps {
  size?: number;
}

const TimeIcon = ({ size }: TimeIconProps) => {
  return <Icon ios={<IoMdTime size={size} />} />;
};

export default TimeIcon;
