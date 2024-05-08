import { ListButton } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store';
import AddIcon from '../../../icons/add.icon';

const AddOverridableMetadataButton = () => {
  const { t } = useTranslation();
  const { setAddOverridableMetadataPopup } = useStore();

  return (
    <ListButton onClick={() => setAddOverridableMetadataPopup(true)}>
      <AddIcon size={18} />
      <div style={{ width: 4 }} />
      {t('root.settings.create-metadata')}
    </ListButton>
  );
};

export default AddOverridableMetadataButton;
