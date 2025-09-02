import { ListItem } from 'konsta/react';
import LabIcon from '../../../icons/lab.icon';
import { useStore } from '../../../store';
import { CapacitorUpdater } from '@capgo/capacitor-updater';

const BetaListItem = () => {
  const { setLoading } = useStore();

  return (
    <ListItem
      media={<LabIcon size={26} />}
      title={'Beta'}
      link
      onClick={async () => {
        setLoading(true);
        const { version: publishedVersion, url } = await fetch('https://next-exif-frame.yuru.cam/version.json').then((res) => res.json());
        const bundle = await CapacitorUpdater.download({ url, version: publishedVersion });
        await CapacitorUpdater.set(bundle);
        setLoading(false);
      }}
    />
  );
};

export default BetaListItem;
