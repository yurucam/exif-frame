import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import SponsorsIcon from '../../../icons/sponsors.icon';

const SponsorListItem = () => {
  const { t } = useTranslation();

  return <ListItem media={<SponsorsIcon size={26} />} title={t('root.sponsor')} link onClick={() => window.open('https://github.com/sponsors/yurucam')} />;
};

export default SponsorListItem;
