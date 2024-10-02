import { Icon } from 'konsta/react';
import { IoAddOutline } from 'react-icons/io5';

interface AddIconProps {
  size?: number;
}

const AddIcon = ({ size }: AddIconProps) => {
  return <Icon ios={<IoAddOutline size={size} />} />;
};

export default AddIcon;
