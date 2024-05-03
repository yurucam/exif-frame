import { Icon, ListButton } from 'konsta/react';
import { IoDownloadOutline } from 'react-icons/io5';
import { useStore } from '../store';
import convert from '../../../../core/drawing/convert';
import free from '../../../../core/drawing/free';
import download from '../../../../core/file-system/download';
import * as Root from '../../../../store';
import { useTranslation } from 'react-i18next';
import COLLAGE_FUNC from './theme';

const DownloadOnePhotoButton = () => {
  const { t } = useTranslation();
  const { exportToJpeg, quality, setLoading } = Root.useStore();
  const { photos } = useStore();

  return (
    <ListButton
      onClick={async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 100));
        const canvas = COLLAGE_FUNC(photos);
        const filename = photos[0].file.name.replace(/\.[^/.]+$/, `.${exportToJpeg ? 'jpg' : 'webp'}`);
        const data = await convert(canvas, { type: exportToJpeg ? 'image/jpeg' : 'image/webp', quality });
        free(canvas);
        await download(filename, data);

        setLoading(false);
      }}
    >
      <Icon ios={<IoDownloadOutline className="w-5 h-5" />} />
      <div style={{ width: 4 }} />
      {t('root.download')}
    </ListButton>
  );
};

export default DownloadOnePhotoButton;
