import { useStore } from '../../../store';
import { Button, Icon } from 'konsta/react';
import Photo from '../../../core/photo';
import { LuPencilLine } from 'react-icons/lu';

interface OverrideMetadataButtonProps {
  photo: Photo;
}

const OverrideMetadataButton: React.FC<OverrideMetadataButtonProps> = ({ photo }) => {
  const { setOverrideMetadataPopup, setOverrideMetadataTarget } = useStore();

  return (
    <Button
      className="k-color-brand-green"
      onClick={() => {
        setOverrideMetadataTarget(photo);
        setOverrideMetadataPopup(true);
      }}
    >
      <Icon ios={<LuPencilLine className="w-5 h-5" />} />
    </Button>
  );
};

export default OverrideMetadataButton;
