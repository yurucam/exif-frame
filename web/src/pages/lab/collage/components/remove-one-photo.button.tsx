import { IoTrashOutline } from 'react-icons/io5';
import { Button, Icon } from 'konsta/react';
import { useStore } from '../store';

interface RemoveOnePhotoButtonProps {
  index: number;
}

const RemoveOnePhotoButton: React.FC<RemoveOnePhotoButtonProps> = ({ index }) => {
  const { photos, setPhotos } = useStore();

  return (
    <div className="w-10">
      <Button
        className="k-color-brand-red"
        onClick={() => {
          const newPhotos = photos.filter((_, i) => i !== index);
          setPhotos(newPhotos);
        }}
      >
        <Icon ios={<IoTrashOutline className="w-5 h-5" />} />
      </Button>
    </div>
  );
};

export default RemoveOnePhotoButton;
