import { List, ListItem, Popover } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store';

const OverrideMetadataPopover = () => {
  const { t } = useTranslation();
  const { overrideMetadataIndexPopup, setOverrideMetadataIndexPopup, overridableMetadata, setOverrideMetadataIndex } = useStore();

  return (
    <Popover opened={overrideMetadataIndexPopup} target={'.override-metadata-index'} onBackdropClick={() => setOverrideMetadataIndexPopup(false)}>
      <List nested>
        {[{ name: 'none' }, ...overridableMetadata].map((metadata) => (
          <ListItem
            key={metadata.name}
            title={t(metadata.name)}
            link
            chevronIos={false}
            onClick={() => {
              if (metadata.name === 'none') {
                setOverrideMetadataIndex(null);
              } else {
                setOverrideMetadataIndex(overridableMetadata.findIndex((m) => m.name === metadata.name));
              }
              setOverrideMetadataIndexPopup(false);
            }}
          />
        ))}
      </List>
    </Popover>
  );
};

export default OverrideMetadataPopover;
