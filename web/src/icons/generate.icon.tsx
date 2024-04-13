import { Icon } from 'konsta/react';
import { RiAiGenerate } from 'react-icons/ri';

interface GenerateIconProps {
  size?: number;
}

const GenerateIcon = ({ size }: GenerateIconProps) => {
  return <Icon ios={<RiAiGenerate size={size} />} />;
};

export default GenerateIcon;
