import { ListItem } from 'konsta/react';
import { GiBackwardTime } from 'react-icons/gi';
import { useLoadingStore } from '../../../state/loading.store';
import { CapacitorUpdater } from '@capgo/capacitor-updater';

const RollbackListItem = () => {
  const { setLoading } = useLoadingStore();
  return (
    <ListItem
      media={<GiBackwardTime size={26} />}
      title={'Rollback'}
      link
      onClick={async () => {
        setLoading(true);
        const { version: publishedVersion, url } = await fetch('https://exif-frame.yuru.cam/version.json').then((res) => res.json());

        const bundle = await CapacitorUpdater.download({ url, version: publishedVersion });
        await CapacitorUpdater.set(bundle);
        setLoading(false);
      }}
    />
  );
};

export default RollbackListItem;
