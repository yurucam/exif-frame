import { ListItem } from 'konsta/react';
import { useStore } from '../store';
import RemoveOnePhotoButton from './remove-one-photo.button';

const AddedPhotoListItem = () => {
  const { photos } = useStore();

  return (
    <>
      {photos.map((photo, index) => (
        <ListItem
          key={index}
          media={<img src={photo.thumbnail} alt={photo.file.name} style={{ width: '8rem', height: '5rem', objectFit: 'cover', borderRadius: '0.5rem' }} />}
          title={photo.file.name}
          text={`${photo.takenAt}`}
          footer={
            <div className="flex space-x-1 mt-1">
              <RemoveOnePhotoButton index={index} />
            </div>
          }
        />
      ))}
    </>
  );
};

export default AddedPhotoListItem;
