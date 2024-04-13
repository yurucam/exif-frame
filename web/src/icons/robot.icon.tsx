import { Icon } from 'konsta/react';
import { FaRobot } from 'react-icons/fa';

interface RobotIconProps {
  size?: number;
}

const RobotIcon = ({ size }: RobotIconProps) => {
  return <Icon ios={<FaRobot size={size} />} />;
};

export default RobotIcon;
