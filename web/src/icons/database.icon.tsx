import { Icon } from 'konsta/react';
import { TbDatabaseLeak } from 'react-icons/tb';

interface DatabaseIconProps {
  size?: number;
}

const DatabaseIcon = ({ size }: DatabaseIconProps) => {
  return <Icon ios={<TbDatabaseLeak size={size} />} />;
};

export default DatabaseIcon;
