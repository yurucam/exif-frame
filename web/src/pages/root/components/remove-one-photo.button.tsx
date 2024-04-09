import { IoTrashOutline } from 'react-icons/io5';
import { useStore } from '../../../store';
import { Button, Icon } from 'konsta/react';

interface RemoveOnePhotoButtonProps {
  index: number;
}

const RemoveOnePhotoButton: React.FC<RemoveOnePhotoButtonProps> = ({ index }) => {
  const { photos, setPhotos } = useStore();

  return (
    <Button
      className="k-color-brand-red"
      onClick={() => {
        const newPhotos = photos.filter((_, i) => i !== index);
        setPhotos(newPhotos);
      }}
    >
      <Icon ios={<IoTrashOutline className="w-5 h-5" />} />
    </Button>
  );
};

export default RemoveOnePhotoButton;
