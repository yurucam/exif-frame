import { ListItem, Range } from 'konsta/react';
import { useStore } from '../../../store';
import { useTranslation } from 'react-i18next';
import QualityIcon from '../../../icons/quality.icon';

const QualityListItem = () => {
  const { t } = useTranslation();
  const { quality, setQuality } = useStore();
  return (
    <ListItem
      title={t('root.settings.quality')}
      media={<QualityIcon size={26} />}
      after={<Range value={quality} min={0} max={100} step={5} onChange={(e) => setQuality(e.target.value)} />}
    />
  );
};

export default QualityListItem;
