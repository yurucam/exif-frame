import { Icon } from 'konsta/react';
import { GiTakeMyMoney } from 'react-icons/gi';

interface MoneyIconProps {
  size?: number;
}

const MoneyIcon = ({ size }: MoneyIconProps) => {
  return <Icon ios={<GiTakeMyMoney size={size} />} />;
};

export default MoneyIcon;
