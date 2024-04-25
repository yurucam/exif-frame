import { Link } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';

const CloseLink = () => {
  const { t } = useTranslation();
  const { setOpenedPanel } = useStore();

  return <Link onClick={() => setOpenedPanel(null)}>{t('close')}</Link>;
};

export default CloseLink;
