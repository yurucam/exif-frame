import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';

const GitHubListItem = () => {
  const { t } = useTranslation();
  return (
    <ListItem
      media={<FaGithub size={26} />}
      title={t('github')}
      link
      onClick={() => {
        const url = 'https://github.com/yurucam/exif-frame';
        window.open(url, '_blank', 'noopener,noreferrer');
      }}
    />
  );
};

export default GitHubListItem;
