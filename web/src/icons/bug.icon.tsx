import { Icon } from 'konsta/react';
import { IoBug } from 'react-icons/io5';

interface BugIconProps {
  size?: number;
}

const BugIcon = ({ size }: BugIconProps) => {
  return <Icon ios={<IoBug size={size} />} />;
};

export default BugIcon;
