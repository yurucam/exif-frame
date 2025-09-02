import { Navbar, Toolbar } from 'konsta/react';
import { DownloadAllPicturesButton } from './components/download-all-pictures.button';
import { UploadPicturesButton } from './components/upload-pictures.button';
import { PicturesGrid } from './components/pictures.grid';
import { usePictureStore } from '../../state/picture.store';
import { useTranslation } from 'react-i18next';

export const GalleryTab = () => {
  const { t } = useTranslation();
  const { pictures } = usePictureStore();

  return (
    <>
      <Navbar title={t('gallery')} />

      <PicturesGrid />

      {pictures.length === 0 ? (
        <div className="flex items-center justify-center py-2">
          <div className="text-neutral-500 dark:text-neutral-400 text-sm font-medium select-none">Upload Pictures please</div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-2">
          <div className="text-neutral-500 dark:text-neutral-400 text-sm font-medium select-none">{pictures.length} picture loaded.</div>
        </div>
      )}

      <Toolbar className="bottom-12 fixed">
        <UploadPicturesButton />
        <DownloadAllPicturesButton />
      </Toolbar>
    </>
  );
};
