import { Button } from 'konsta/react';
import { IoAddOutline } from 'react-icons/io5';
import { useRef, useCallback } from 'react';
import { usePictureStore } from '../../../state/picture.store';
import { Picture } from '../../../core/picture';

export const UploadPicturesButton = () => {
  const { setPictures } = usePictureStore();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    async (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const newPictures = Array.from(files).map((file) => new Picture(file));

      // Add first so UI shows placeholders immediately
      const { pictures } = usePictureStore.getState();
      setPictures([...(pictures ?? []), ...newPictures]);

      // Simple paced thumbnail generation
      let processed = 0;
      for (const p of newPictures) {
        // transparent background; grid supplies dark/light background
        await p.generateThumbnail(512);
        processed += 1;
        if (processed % 4 === 0) {
          const { pictures: current } = usePictureStore.getState();
          setPictures([...current]);
          await new Promise((r) => setTimeout(r, 0));
        }
      }
      // Final update
      const { pictures: current } = usePictureStore.getState();
      setPictures([...current]);

      // Reset input so selecting the same files again triggers change
      e.target.value = '';
    },
    [setPictures]
  );

  return (
    <>
      <input ref={inputRef} type="file" accept="image/jpeg" multiple style={{ display: 'none' }} onChange={handleChange} />

      <Button clear onClick={handleClick}>
        <IoAddOutline size={18} />
        <div style={{ width: 4 }} />
        {'Upload Pictures'}
      </Button>
    </>
  );
};
