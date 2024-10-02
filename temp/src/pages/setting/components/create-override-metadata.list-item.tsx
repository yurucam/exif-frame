import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import PencilIcon from '../../../icons/pencil.icon';
import { useNavigate } from 'react-router-dom';

const CreateOverrideMetadataListItem = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return <ListItem media={<PencilIcon size={26} />} title={t('root.settings.create-metadata')} link onClick={() => navigate('/metadata')} />;
};

export default CreateOverrideMetadataListItem;
