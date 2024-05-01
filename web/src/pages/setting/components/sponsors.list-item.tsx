import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SponsorsIcon from '../../../icons/sponsors.icon';

const SponsorsListItem = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return <ListItem media={<SponsorsIcon size={26} />} title={t('root.sponsors')} link onClick={() => navigate('/sponsors')} />;
};

export default SponsorsListItem;
