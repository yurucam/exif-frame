import { IoTrashOutline } from 'react-icons/io5';
import { useStore } from '../../../store';
import { Button, Icon } from 'konsta/react';

interface RemoveOneMetadataButtonProps {
  index: number;
}

const RemoveOneMetadataButton: React.FC<RemoveOneMetadataButtonProps> = ({ index }) => {
  const { overridableMetadata, setOverridableMetadata, overrideMetadataIndex, setOverrideMetadataIndex } = useStore();

  return (
    <div className="w-10">
      <Button
        className="k-color-brand-red"
        onClick={() => {
          const newMetadata = overridableMetadata.filter((_, i) => i !== index);
          setOverridableMetadata(newMetadata);

          if (overrideMetadataIndex === index) {
            setOverrideMetadataIndex(null);
          }
        }}
      >
        <Icon ios={<IoTrashOutline className="w-5 h-5" />} />
      </Button>
    </div>
  );
};

export default RemoveOneMetadataButton;
