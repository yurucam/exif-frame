import { ListItem } from 'konsta/react';
import { useNavigate } from 'react-router-dom';
import { SiGithubsponsors } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

const SponsorsListItem = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return <ListItem media={<SiGithubsponsors size={26} />} title={t('sponsors')} link onClick={() => navigate('/sponsors')} />;
};

export default SponsorsListItem;
