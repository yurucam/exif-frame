import { Icon } from 'konsta/react';
import { GoGitPullRequest } from 'react-icons/go';

interface PullRequestIconProps {
  size?: number;
}

const PullRequestIcon = ({ size }: PullRequestIconProps) => {
  return <Icon ios={<GoGitPullRequest size={size} />} />;
};

export default PullRequestIcon;
