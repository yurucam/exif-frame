import { Icon } from 'konsta/react';
import { TbDragDrop } from 'react-icons/tb';

interface DragInDropIconProps {
  size?: number;
}

const DragInDropIcon = ({ size }: DragInDropIconProps) => {
  return <Icon ios={<TbDragDrop size={size} />} />;
};

export default DragInDropIcon;
