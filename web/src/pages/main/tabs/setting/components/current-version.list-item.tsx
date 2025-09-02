import { ListItem } from 'konsta/react';
import { FaRobot } from 'react-icons/fa';
import PackageJson from '../../../../../../package.json';
import { useTranslation } from 'react-i18next';

const CurrentVersionListItem = () => {
  const { t } = useTranslation();
  return <ListItem media={<FaRobot size={26} />} title={t('current-version')} after={<span style={{ color: 'var(--kon-color-primary)' }}>{PackageJson.version}</span>} />;
};

export default CurrentVersionListItem;
