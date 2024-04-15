import { useStore } from '../../../store';
import { Button, Icon } from 'konsta/react';
import Photo from '../../../core/photo';
import { IoDownloadOutline } from 'react-icons/io5';
import { downloadOnePhotoEvent } from '../../../google-analytics';
import themes, { useThemeStore } from '../../../themes';
import render from '../../../core/drawing/render';
import convert from '../../../core/drawing/convert';
import free from '../../../core/drawing/free';
import download from '../../../core/file-system/download';

interface DownloadOnePhotoButtonProps {
  photo: Photo;
}

const DownloadOnePhotoButton: React.FC<DownloadOnePhotoButtonProps> = ({ photo }) => {
  const store = useStore();
  const { selectedThemeName, exportToJpeg, quality, setLoading } = store;

  const { option } = useThemeStore();
  const theme = themes.find((theme) => theme.name === selectedThemeName);
  theme?.options.forEach((themeOption) => {
    if (!option.has(themeOption.key)) option.set(themeOption.key, themeOption.default);
  });
  const func = theme?.func;

  return (
    <div className="w-10">
      <Button
        onClick={async () => {
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 100));

          const canvas = await render(func!, photo, option, store);
          const filename = photo.file.name.replace(/\.[^/.]+$/, `.${photo.file.type === 'image/jpeg' ? 'jpg' : 'webp'}`);
          const data = await convert(canvas, { type: exportToJpeg ? 'image/jpeg' : 'image/webp', quality });
          free(canvas);
          await download(filename, data);

          setLoading(false);
          downloadOnePhotoEvent();
        }}
      >
        <Icon ios={<IoDownloadOutline className="w-5 h-5" />} />
      </Button>
    </div>
  );
};

export default DownloadOnePhotoButton;
