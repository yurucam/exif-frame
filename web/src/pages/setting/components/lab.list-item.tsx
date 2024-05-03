import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LabIcon from '../../../icons/lab.icon';

const LabListItem = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return <ListItem media={<LabIcon size={26} />} title={t('lab')} link onClick={() => navigate('/lab')} />;
};

export default LabListItem;
