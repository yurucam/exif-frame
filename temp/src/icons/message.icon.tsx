import { Icon } from 'konsta/react';
import { BiMessageDots } from 'react-icons/bi';

interface MessageIconProps {
  size?: number;
}

const MessageIcon = ({ size }: MessageIconProps) => {
  return <Icon ios={<BiMessageDots size={size} />} />;
};

export default MessageIcon;
