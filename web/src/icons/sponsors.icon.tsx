import { Icon } from 'konsta/react';
import { SiGithubsponsors } from 'react-icons/si';

interface SponsorsIconProps {
  size?: number;
}

const SponsorsIcon = ({ size }: SponsorsIconProps) => {
  return <Icon ios={<SiGithubsponsors size={size} />} />;
};

export default SponsorsIcon;
