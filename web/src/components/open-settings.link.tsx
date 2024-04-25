import { Link } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';

const OpenSettingsLink = () => {
  const { t } = useTranslation();
  const { setOpenedPanel } = useStore();

  return <Link onClick={() => setOpenedPanel('right')}>{t('root.settings')}</Link>;
};

export default OpenSettingsLink;
