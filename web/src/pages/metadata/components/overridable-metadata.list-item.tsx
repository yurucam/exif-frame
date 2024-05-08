import { ListItem } from 'konsta/react';
import { useStore } from '../../../store';
import RemoveOneMetadataButton from './remove-one-metadata.button';

const OverridableMetadataList = () => {
  const { overridableMetadata } = useStore();

  return (
    <>
      {overridableMetadata.map((metadata, index) => (
        <ListItem
          key={index}
          title={metadata.name}
          text={`${metadata.make} ${metadata.model} ${metadata.lensModel} ${metadata.focalLength} ${metadata.focalLengthIn35mm} ${metadata.fNumber} ${metadata.iso} ${metadata.exposureTime} ${metadata.takenAt}`}
          footer={
            <div className="flex space-x-1 mt-1">
              <RemoveOneMetadataButton index={index} />
            </div>
          }
        />
      ))}
    </>
  );
};

export default OverridableMetadataList;
