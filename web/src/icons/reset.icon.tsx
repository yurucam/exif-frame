import { Icon } from 'konsta/react';
import { GrPowerReset } from 'react-icons/gr';

interface ResetIconProps {
  size?: number;
}

const ResetIcon = ({ size }: ResetIconProps) => {
  return <Icon ios={<GrPowerReset size={size} />} />;
};

export default ResetIcon;
