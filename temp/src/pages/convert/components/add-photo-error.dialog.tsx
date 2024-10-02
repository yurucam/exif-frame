import { Dialog, DialogButton } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';

const AddPhotoErrorDialog = () => {
  const { t } = useTranslation();
  const { openedAddPhotoErrorDialog, setOpenedAddPhotoErrorDialog } = useStore();

  return (
    <Dialog
      opened={openedAddPhotoErrorDialog}
      onBackdropClick={() => setOpenedAddPhotoErrorDialog(false)}
      title={t('fail-to-load-photos')}
      content={t('please-check-your-photo-extension')}
      buttons={<DialogButton onClick={() => setOpenedAddPhotoErrorDialog(false)}>{t('close')}</DialogButton>}
    />
  );
};

export default AddPhotoErrorDialog;
