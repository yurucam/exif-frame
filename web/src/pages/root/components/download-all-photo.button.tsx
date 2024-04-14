import { Button } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../../store';
import canvasToWebp from '../../../core/canvas-to-webp';
import downloadManyFile from '../../../core/download-many-file';
import canvasToJpeg from '../../../core/canvas-to-jpeg';
import { downloadAllPhotosEvent } from '../../../google-analytics';
import DownloadIcon from '../../../icons/download.icon';
import render from '../../../themes/00_BASE/render';
import themes, { useThemeStore } from '../../../themes';
import { Capacitor } from '@capacitor/core';
import downloadOneFile from '../../../core/download-one-file';

const DownloadAllPhotoButton = () => {
  const { t } = useTranslation();
  const store = useStore();
  const { photos, selectedThemeName, exportToJpeg, quality, setLoading } = store;

  const { option } = useThemeStore();
  const theme = themes.find((theme) => theme.name === selectedThemeName);
  theme?.options.forEach((themeOption) => {
    if (!option.has(themeOption.key)) option.set(themeOption.key, themeOption.default);
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
          const files: { name: string; buffer: ArrayBuffer; type: 'image/jpeg' | 'image/webp' }[] = [];
          if (Capacitor.isNativePlatform()) {
            for (const photo of photos) {
              const canvas = await render(func!, photo, option, store);
              await downloadOneFile({
                name: photo.file.name,
                buffer: exportToJpeg ? await canvasToJpeg(canvas, quality) : await canvasToWebp(canvas, quality),
                type: exportToJpeg ? 'image/jpeg' : 'image/webp',
              });
            }
          } else {
            await Promise.all(
              photos.map(async (photo) => {
                const canvas = await render(func!, photo, option, store);
                files.push({
                  name: photo.file.name,
                  buffer: exportToJpeg ? await canvasToJpeg(canvas, quality) : await canvasToWebp(canvas, quality),
                  type: exportToJpeg ? 'image/jpeg' : 'image/webp',
                });
              })
            );
            await downloadManyFile(files);
          }
          setLoading(false);
          downloadAllPhotosEvent();
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
