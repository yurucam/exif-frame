import { ListItem } from 'konsta/react';
import { SiDiscord } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

const DiscordListItem = () => {
  const { t } = useTranslation();
  return (
    <ListItem
      media={<SiDiscord size={26} />}
      title={t('discord')}
      link
      onClick={() => {
        const url = 'https://discord.gg/3zyjrjVhn5';
        window.open(url, '_blank', 'noopener,noreferrer');
      }}
    />
  );
};

export default DiscordListItem;
