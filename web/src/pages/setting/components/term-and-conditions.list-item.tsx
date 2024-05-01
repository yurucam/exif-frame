import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LawIcon from '../../../icons/law.icon';

const TermAndConditionsListItem = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return <ListItem media={<LawIcon size={26} />} title={t('term-and-conditions')} link onClick={() => navigate('/term_and_conditions.html')} />;
};

export default TermAndConditionsListItem;
