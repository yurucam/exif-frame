import { ListItem } from 'konsta/react';
import { FaRobot } from 'react-icons/fa';
import PackageJson from '../../../../../../package.json';

const CurrentVersionListItem = () => {
  return <ListItem media={<FaRobot size={26} />} title={'Current version'} after={<span style={{ color: 'var(--kon-color-primary)' }}>{PackageJson.version}</span>} />;
};

export default CurrentVersionListItem;
