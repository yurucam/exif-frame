import { Button } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store';
import DownloadIcon from '../../../icons/download.icon';
import render from '../../../core/drawing/render';
import themes from '../../../themes';
import { Capacitor } from '@capacitor/core';
import convert from '../../../core/drawing/convert';
import free from '../../../core/drawing/free';
import download from '../../../core/file-system/download';
import compress from '../../../core/file-system/compress';
import Customize from '../../theme/database/customize';
import { ThemeOptionInput, getConverter } from '../../theme/types/theme-option';

const DownloadAllPhotoButton = () => {
  const { t } = useTranslation();
  const store = useStore();
  const { photos, selectedThemeName, exportToJpeg, quality, setLoading } = store;

  const input: ThemeOptionInput = new Map<string, string | number | boolean>();
  const theme = themes.find((theme) => theme.name === selectedThemeName);
  theme?.options.forEach((option) => {
    const value = Customize.get(selectedThemeName, option.id, getConverter(option.type));
    if (value !== null) {
      input.set(option.id, value);
    } else {
      input.set(option.id, option.default);
    }
  });

  const func = theme?.func;

  return (
    <>
      <Button
        clear
        onClick={async () => {
          if (photos.length === 0) return;
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 100));

          if (Capacitor.isNativePlatform()) {
            for (const photo of photos) {
              const canvas = await render(func!, photo, input, store);
              const filename = photo.file.name.replace(/\.[^/.]+$/, `.${exportToJpeg ? 'jpg' : 'webp'}`);
              const data = await convert(canvas, { type: exportToJpeg ? 'image/jpeg' : 'image/webp', quality });
              free(canvas);
              await download(filename, data);
            }
          } else {
            const files: { filename: string; data: string }[] = [];
            await Promise.all(
              photos.map(async (photo) => {
                const canvas = await render(func!, photo, input, store);
                const filename = photo.file.name.replace(/\.[^/.]+$/, `.${exportToJpeg ? 'jpg' : 'webp'}`);
                const data = await convert(canvas, { type: exportToJpeg ? 'image/jpeg' : 'image/webp', quality });
                free(canvas);
                files.push({ filename, data });
              })
            );
            const zip = await compress(files);
            await download('images.zip', zip);
          }

          setLoading(false);
        }}
      >
        <DownloadIcon size={16} />
        <div style={{ width: 4 }} />
        {t('root.download-all')}
      </Button>
    </>
  );
};

export default DownloadAllPhotoButton;
