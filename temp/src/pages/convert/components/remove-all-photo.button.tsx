import { IoTrashOutline } from 'react-icons/io5';
import { useStore } from '../../../store';
import { Button, Icon } from 'konsta/react';

const RemoveAllPhotoButton = () => {
  const { setPhotos } = useStore();

  return (
    <div className="w-7 h-7">
      <Button className="k-color-brand-red" onClick={() => setPhotos([])}>
        <Icon ios={<IoTrashOutline className="w-5 h-5" />} />
      </Button>
    </div>
  );
};

export default RemoveAllPhotoButton;
