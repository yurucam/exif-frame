import { Icon } from 'konsta/react';
import { LuPencilLine } from 'react-icons/lu';

interface PencilIconProps {
  size?: number;
}

const PencilIcon = ({ size }: PencilIconProps) => {
  return <Icon ios={<LuPencilLine size={size} />} />;
};

export default PencilIcon;
