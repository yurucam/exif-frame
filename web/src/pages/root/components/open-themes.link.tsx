import { Link } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store';

const OpenThemesLink = () => {
  const { t } = useTranslation();
  const { setOpenedPanel } = useStore();

  return <Link onClick={() => setOpenedPanel('left')}>{t('root.themes')}</Link>;
};

export default OpenThemesLink;
