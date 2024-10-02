import { Icon } from 'konsta/react';
import { IoLanguage } from 'react-icons/io5';

interface LanguageIconProps {
  size?: number;
}

const LanguageIcon = ({ size }: LanguageIconProps) => {
  return <Icon ios={<IoLanguage size={size} />} />;
};

export default LanguageIcon;
