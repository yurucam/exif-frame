import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LawIcon from '../../../icons/law.icon';

const PrivacyPolicyListItem = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return <ListItem media={<LawIcon size={26} />} title={t('privacy-policy')} link onClick={() => navigate('/privacy_policy.html')} />;
};

export default PrivacyPolicyListItem;
