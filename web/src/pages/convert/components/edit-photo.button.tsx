import { Button } from 'konsta/react';
import { useStore } from '../../../store';
import PencilIcon from '../../../icons/pencil.icon';

const EditPhotoButton = ({ index }: { index: number }) => {
  const { setEditPhotoIndex } = useStore();

  return (
    <Button clear rounded onClick={() => setEditPhotoIndex(index)}>
      <PencilIcon size={24} />
    </Button>
  );
};

export default EditPhotoButton;
