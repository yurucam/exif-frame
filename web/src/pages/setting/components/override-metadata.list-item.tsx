import { ListItem } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store';
import PencilIcon from '../../../icons/pencil.icon';

const OverrideMetadataListItem = () => {
  const { t } = useTranslation();
  const { setOverrideMetadataIndexPopup, overrideMetadataIndex, overridableMetadata } = useStore();

  const metadata = overrideMetadataIndex == null ? null : overridableMetadata.length > overrideMetadataIndex ? overridableMetadata[overrideMetadataIndex] : null;

  return (
    <ListItem
      media={<PencilIcon size={26} />}
      title={t('root.settings.select-overridable-metadata')}
      after={<div className="override-metadata-index">{metadata?.name || 'none'}</div>}
      onClick={() => setOverrideMetadataIndexPopup(true)}
      link
    />
  );
};

export default OverrideMetadataListItem;
