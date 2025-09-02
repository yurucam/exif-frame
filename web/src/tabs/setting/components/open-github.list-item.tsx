import { ListItem } from 'konsta/react';
import { FaGithub } from 'react-icons/fa';

const GitHubListItem = () => {
  return (
    <ListItem
      media={<FaGithub size={26} />}
      title={'GitHub'}
      link
      onClick={() => {
        const url = 'https://github.com/yurucam/exif-frame';
        window.open(url, '_blank', 'noopener,noreferrer');
      }}
    />
  );
};

export default GitHubListItem;
